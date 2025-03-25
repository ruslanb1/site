(() => {
    const canvas = document.getElementById("doppler-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = document.getElementsByTagName("article")[0].clientWidth;
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 1;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    let scale
    if (canvas.width > canvas.height) {
        scale = canvas.height / 10 + 7
    } else {
        scale = canvas.width / 10 + 7
    }
    ctx.strokeStyle = "#000";
    ctx.beginPath()
    ctx.arc(cx, cy, scale * 1.8, 0, Math.PI * 2);
    ctx.moveTo(cx - scale * 0.8, cy - scale);
    ctx.lineTo(cx + scale * 1.2, cy);
    ctx.lineTo(cx - scale * 0.8, cy + scale);
    ctx.lineTo(cx - scale * 0.8, cy - scale);
    ctx.stroke();
    ctx.lineJoin = "miter"
    ctx.lineCap = "butt"
    ctx.lineWidth = 1;
})()


function doppler(el) {
    el.onclick = null; //stops the function from running on button click
    document.getElementById("doppler-input").style.display = "inline"
    const canvas = el
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = 300;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#f05";
        ctx.lineWidth = 2;
    }
    setupCanvas();
    window.onresize = function () {
        setupCanvas();
    };
    canvas.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
    });

    const one = {
        cycle: 0,
        pause: false,
        position: {
            x: canvas.width,
            y: canvas.height / 2
        },
        velocity: {
            x: -1,
            y: 0
        }, //velocity should be below the wave speed
        waveSpeed: 2,
        move: function () {
            if (this.velocity.x !== 0) this.position.x += this.velocity.x;
            // this.position.y += this.velocity.y;
        },
        wallGap: 200,
        walls: function () {
            if (this.position.x > canvas.width + this.wallGap) {
                this.velocity.x = -Math.abs(this.velocity.x);
                this.position.x = canvas.width + this.wallGap;
            } else if (this.position.x < -this.wallGap) {
                this.velocity.x = Math.abs(this.velocity.x);
                this.position.x = -this.wallGap;
            }
            if (this.position.y > canvas.height + this.wallGap) {
                this.velocity.y = -Math.abs(this.velocity.y);
                this.position.y = canvas.height + this.wallGap;
            } else if (this.position.y < -this.wallGap) {
                this.velocity.y = Math.abs(this.velocity.y);
                this.position.y = -this.wallGap;
            }
        },
        period: 15,
        waves: [],
        addCrest: function () {
            if (!(one.cycle % this.period)) {
                this.waves.push({
                    x: this.position.x,
                    y: this.position.y,
                    r: 0,
                    color: 0
                });
            }
        },
        drawSource: function () {
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "#f05";
            ctx.fill();
        },
        draw: function () {
            for (let i = this.waves.length - 1; i > -1; --i) {
                this.waves[i].color += 0.5;
                //remove from array if color goes to white (255)
                if (this.waves[i].color > 255) this.waves.shift();
            }

            // ctx.clearRect(0, 0, canvas.width, canvas.height); //clear
            ctx.fillStyle = "rgba(255,255,255,0.4)"
            ctx.fillRect(0, 0, canvas.width, canvas.height); //clear

            for (let i = 0, len = this.waves.length; i < len; i++) {
                this.waves[i].r += this.waveSpeed;
                ctx.beginPath();
                ctx.arc(this.waves[i].x, this.waves[i].y, this.waves[i].r, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgb(${this.waves[i].color},${this.waves[i].color},${this.waves[i].color})`;
                ctx.stroke();

                //faded out version to smooth out gradient
                ctx.beginPath();
                ctx.arc(this.waves[i].x, this.waves[i].y, this.waves[i].r - this.waveSpeed / 2, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(${this.waves[i].color},${this.waves[i].color},${this.waves[i].color}, 0.6)`;
                ctx.stroke();
            }
            this.drawSource();
        },
        observer: {
            position: {
                x: 50,
                y: 50
            },
            draw: function () {
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
                ctx.fill();
            },
        }
    };

    const mouseOver = document.getElementById("mouseover")
    mouseOver.addEventListener("mouseleave", () => {
        one.pause = true;
    });
    mouseOver.addEventListener("mouseenter", () => {
        one.pause = false;
        if (!one.pause) requestAnimationFrame(cycle);
    });

    document.getElementById("doppler-period").addEventListener("input", () => {
        one.period = Math.floor(Number(document.getElementById("doppler-period").value) * 60);
        document.getElementById("doppler-period-slider").value = one.period
    });
    document.getElementById("doppler-period-slider").addEventListener("input", () => {
        one.period = Number(document.getElementById("doppler-period-slider").value);
        document.getElementById("doppler-period").value = one.period / 60
    });

    document.getElementById("doppler-speed").addEventListener("input", () => {
        one.waveSpeed = Number(document.getElementById("doppler-speed").value);
        document.getElementById("doppler-speed-slider").value = one.waveSpeed
    });
    document.getElementById("doppler-speed-slider").addEventListener("input", () => {
        one.waveSpeed = Number(document.getElementById("doppler-speed-slider").value);
        document.getElementById("doppler-speed").value = one.waveSpeed
    });

    document.getElementById("doppler-source-speed").addEventListener("input", () => {
        const speed = Number(document.getElementById("doppler-source-speed").value)
        const sign = Math.sign(one.velocity.x)
        if (sign !== 0) {
            one.velocity.x = speed * sign
        } else {
            one.velocity.x = speed
        }
        document.getElementById("doppler-source-speed-slider").value = speed
    });
    document.getElementById("doppler-source-speed-slider").addEventListener("input", () => {
        const speed = Number(document.getElementById("doppler-source-speed-slider").value)
        const sign = Math.sign(one.velocity.x)
        if (sign !== 0) {
            one.velocity.x = speed * sign
        } else {
            one.velocity.x = speed
        }
        document.getElementById("doppler-source-speed").value = speed
    });

    const cycle = function () {
        if (!one.pause) window.requestAnimationFrame(cycle);
        one.cycle++;
        one.addCrest();
        one.move();
        one.walls();
        one.draw();
    };
    window.requestAnimationFrame(cycle);
}