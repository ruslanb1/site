startBeats()

function startBeats() {
    let audioCtx, oscillator1, gainNode1, oscillator2, gainNode2
    const buttonEl = document.getElementById("beats-play")

    const beats = {
        started: false,
        paused: false,
        frequency1: 372,
        frequency2: 375,
        volume1: 0.2,
        volume2: 0.2,
        analSize: 2,
        analOut: 2048
    };

    // start -> play/pause  button events
    buttonEl.addEventListener("click", function () {
        if (!beats.started) {
            beats.started = true
            beats.paused = false
            document.getElementById("hide-beats").style.display = "inline"; //show hidden interface
            buttonEl.textContent = 'pause';

            //setup audio context
            audioCtx = new(window.AudioContext || window.webkitAudioContext)();

            oscillator1 = audioCtx.createOscillator();
            gainNode1 = audioCtx.createGain();
            gainNode1.gain.value = beats.volume1; //controls volume
            oscillator1.connect(gainNode1);
            gainNode1.connect(audioCtx.destination);
            oscillator1.type = "sine"; // 'sine' 'square', 'sawtooth', 'triangle' and 'custom'
            oscillator1.frequency.value = beats.frequency1; // value in hertz
            oscillator1.start();

            oscillator2 = audioCtx.createOscillator();
            gainNode2 = audioCtx.createGain();
            gainNode2.gain.value = beats.volume2; //controls volume
            oscillator2.connect(gainNode2);
            gainNode2.connect(audioCtx.destination);
            oscillator2.type = "sine"; // 'sine' 'square', 'sawtooth', 'triangle' and 'custom'
            oscillator2.frequency.value = beats.frequency2; // value in hertz
            oscillator2.start();

            beatsCanvas()
        } else {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(function () {
                    buttonEl.textContent = 'pause';
                    beatsCanvas()
                });
            } else if (audioCtx.state === 'running') {
                audioCtx.suspend().then(function () {
                    buttonEl.textContent = 'play';
                    beats.paused = true
                });
            }
        }
    });

    document.getElementById("beats-vol").addEventListener("input", () => {
        beats.volume1 = document.getElementById("beats-vol").value;
        document.getElementById("beats-vol-slider").value = beats.volume1
        gainNode1.gain.value = beats.volume1 / 2; //controls volume
    });
    document.getElementById("beats-vol-slider").addEventListener("input", () => {
        beats.volume1 = document.getElementById("beats-vol-slider").value;
        document.getElementById("beats-vol").value = beats.volume1
        gainNode1.gain.value = beats.volume1 / 2; //controls volume
    });

    document.getElementById("beats-vol-2").addEventListener("input", () => {
        beats.volume2 = document.getElementById("beats-vol-2").value;
        document.getElementById("beats-vol-slider-2").value = beats.volume2
        gainNode2.gain.value = beats.volume2 / 2; //controls volume
    });
    document.getElementById("beats-vol-slider-2").addEventListener("input", () => {
        beats.volume2 = document.getElementById("beats-vol-slider-2").value;
        document.getElementById("beats-vol-2").value = beats.volume2
        gainNode2.gain.value = beats.volume2 / 2; //controls volume
    });

    document.getElementById("beats-f1").addEventListener("input", () => {
        beats.frequency1 = document.getElementById("beats-f1").value;
        document.getElementById("beats-f1-slider").value = beats.frequency1
        oscillator1.frequency.value = beats.frequency1; // value in hertz
    });
    document.getElementById("beats-f1-slider").addEventListener("input", () => {
        beats.frequency1 = document.getElementById("beats-f1-slider").value;
        document.getElementById("beats-f1").value = beats.frequency1
        oscillator1.frequency.value = beats.frequency1; // value in hertz
    });

    document.getElementById("beats-f2").addEventListener("input", () => {
        beats.frequency2 = document.getElementById("beats-f2").value;
        document.getElementById("beats-f2-slider").value = beats.frequency2
        oscillator2.frequency.value = beats.frequency2; // value in hertz
    });
    document.getElementById("beats-f2-slider").addEventListener("input", () => {
        beats.frequency2 = document.getElementById("beats-f2-slider").value;
        document.getElementById("beats-f2").value = beats.frequency2
        oscillator2.frequency.value = beats.frequency2; // value in hertz
    });

    document.getElementById("beats-analyser-slider").addEventListener("input", () => {
        beats.analSize = document.getElementById("beats-analyser-slider").value;
        beats.paused = true
        switch (beats.analSize) {
            case "1":
                beats.analOut = 256
                break;
            case "2":
                beats.analOut = 512
                break;
            case "3":
                beats.analOut = 1024
                break;
            case "4":
                beats.analOut = 2048
                break;
            case "5":
                beats.analOut = 4096
                break;
            case "6":
                beats.analOut = 8192
                break;
            case "7":
                beats.analOut = 16384
                break;
            case "8":
                beats.analOut = 32768
                break;
        }

        function restartCanvas() {
            beatsCanvas()
        }
        window.setTimeout(restartCanvas, 100);
    });

    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
    function beatsCanvas() {
        const canvas = document.getElementById("beats-canvas");
        const ctx = canvas.getContext("2d");

        const width = 590
        const height = 100

        function setupCanvas() {
            if (document.body.clientWidth > width) {
                canvas.style.width = width + "px";
                canvas.style.height = height + "px";

                const scale = window.devicePixelRatio;
                canvas.width = width * scale;
                canvas.height = height * scale;
                ctx.scale(scale, scale);
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000";
            ctx.lineJoin = 'bevel'; //miter
            ctx.miterLimit = 1;
        }
        setupCanvas();
        window.onresize = function () {
            setupCanvas();
        };

        const analyser1 = audioCtx.createAnalyser();
        gainNode1.connect(analyser1);
        analyser1.fftSize = beats.analOut;
        const bufferLength = analyser1.frequencyBinCount;
        const dataArray1 = new Uint8Array(bufferLength);

        const analyser2 = audioCtx.createAnalyser();
        gainNode2.connect(analyser2);
        analyser2.fftSize = beats.analOut
        const dataArray2 = new Uint8Array(bufferLength);

        // const WIDTH = canvas.width;
        // const HEIGHT = canvas.height;

        function draw() {
            if (!beats.paused) {
                drawVisual = requestAnimationFrame(draw);
                analyser1.getByteTimeDomainData(dataArray1);
                analyser2.getByteTimeDomainData(dataArray2);
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath();
                const sliceWidth = width / bufferLength;
                let x = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const v = (dataArray1[i] + dataArray2[i]) / 256.0;
                    const y = v * height - height / 2;
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    x += sliceWidth;
                }
                // ctx.lineTo(width, height / 2);
                ctx.stroke();
            }
        }
        beats.paused = false
        draw();
    }
}