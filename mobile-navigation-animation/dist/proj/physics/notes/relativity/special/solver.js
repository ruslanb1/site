function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function drawRocket(ctx, x, y, rocketTime = 0, scale = 1, period = 5) {
  //move canvas to the ship and compress in the horizontal direction
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, 1);
  //rocket fins
  ctx.fillStyle = "#D90429";
  ctx.beginPath();
  ctx.moveTo(20, 10);
  ctx.lineTo(-20, -10);
  ctx.quadraticCurveTo(20, -20, 100, 10);
  ctx.closePath();
  ctx.fill();
  //lower fin
  ctx.beginPath();
  ctx.moveTo(20, 90);
  ctx.lineTo(-20, 110);
  ctx.quadraticCurveTo(20, 120, 100, 90);
  ctx.closePath();
  ctx.fill();
  //rocket body
  ctx.fillStyle = "#EDF2F4";
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.quadraticCurveTo(140, -30, 200, 50);
  ctx.quadraticCurveTo(140, 130, 0, 90);
  ctx.closePath();
  ctx.fill();
  //nose
  ctx.fillStyle = "#D90429";
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillRect(180, 29, 20, 42);
  ctx.globalCompositeOperation = "source-over";
  // ctx.beginPath();
  // ctx.moveTo(180, 28);
  // ctx.quadraticCurveTo(203, 49, 200, 50);
  // ctx.quadraticCurveTo(203, 49, 180, 73);
  // ctx.closePath();
  // ctx.fill();

  //clock outline
  ctx.fillStyle = "#D3DBDE";
  ctx.beginPath();
  ctx.arc(80, 50, 45, 0, 2 * Math.PI);
  ctx.fill();
  //clock
  ctx.fillStyle = "#2B2D42";
  ctx.beginPath();
  ctx.moveTo(80, 50);
  // ctx.arc(80, 50, 45, 0, Math.floor(time % (period * 2 * Math.PI * 10)) / 10 / period);
  const percentCircle = ((rocketTime / 60) / period) % 1
  ctx.arc(80, 50, 45, 0, percentCircle * 2 * Math.PI);
  ctx.fill();
  //undo canvas transformations
  ctx.restore();
}

let solver = function () {
  const rockets = {
    gamma: 0,
    t1: 0,
    t2: 0,
    isOn: true
  };

  function update() {
    const v = document.getElementById("velocity").value;
    if (1 - v * v != 0) {
      const time = Number(document.getElementById("time").value);
      const dist = Number(document.getElementById("length").value);
      const mass = Number(document.getElementById("mass").value);
      rockets.gamma = 1 / Math.sqrt(1 - v * v);
      const vTime = time * rockets.gamma;
      const vDist = dist / rockets.gamma;
      const vMass = mass * rockets.gamma;
      document.getElementById("velocity2").value = v * 3;
      document.getElementById("gamma").value = Math.round(rockets.gamma * 1000000000000) / 1000000000000;
      document.getElementById("v_time").value = vTime.toFixed(4);
      document.getElementById("v_length").value = vDist.toFixed(4);
      document.getElementById("v_mass").value = vMass.toFixed(4);
      // document.getElementById("length1").style.width = dist * 10 + "px";
      // document.getElementById("length2").style.width = vDist * 10 + "px";
    }
  }

  function updateMoving() {
    const v = document.getElementById("velocity").value;
    if (1 - v * v != 0) {
      rockets.gamma = 1 / Math.sqrt(1 - v * v);
      const vTime = Number(document.getElementById("v_time").value);
      const vDist = Number(document.getElementById("v_length").value);
      const vMass = Number(document.getElementById("v_mass").value);
      const time = vTime / rockets.gamma;
      const dist = vDist * rockets.gamma;
      const mass = vMass / rockets.gamma;
      document.getElementById("velocity2").value = v * 3;
      document.getElementById("gamma").value = Math.round(rockets.gamma * 1000000000000) / 1000000000000;
      document.getElementById("time").value = time.toFixed(4);
      document.getElementById("length").value = dist.toFixed(4);
      document.getElementById("mass").value = mass.toFixed(4);
      // document.getElementById("length1").style.width = dist * 10 + "px";
      // document.getElementById("length2").style.width = vDist * 10 + "px";
    }
  }

  function convertVelocity() {
    const v = document.getElementById("velocity2").value / 3;
    document.getElementById("velocity").value = v;
    update();
  }

  function convertGamma() {
    const g = document.getElementById("gamma").value;
    document.getElementById("velocity").value = Math.sqrt(1 - (1 / g) * (1 / g));
    update();
  }
  update();

  document.getElementById("velocity").addEventListener("input", update);
  document.getElementById("velocity2").addEventListener("input", convertVelocity);
  document.getElementById("gamma").addEventListener("input", convertGamma);
  document.getElementById("time").addEventListener("input", update);
  document.getElementById("length").addEventListener("input", update);
  document.getElementById("mass").addEventListener("input", update);
  document.getElementById("v_time").addEventListener("input", updateMoving);
  document.getElementById("v_length").addEventListener("input", updateMoving);
  document.getElementById("v_mass").addEventListener("input", updateMoving);

  //draw the clocks
  var canvas = document.getElementById("rockets");
  var ctx = canvas.getContext("2d");


  canvas.addEventListener("click", function () {
    if (rockets.isOn) {
      rockets.isOn = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRocket(ctx, 20, 20, rockets.t1, 1 / rockets.gamma);
      drawRocket(ctx, 320, 20, rockets.t2, 1);
    } else {
      rockets.isOn = true;
    }
  });

  //___________________animation loop ___________________
  const fpsCap = 60;
  const fpsInterval = 1000 / fpsCap;
  let then = Date.now();
  requestAnimationFrame(cycle); //starts game loop

  function cycle() {
    requestAnimationFrame(cycle);
    const now = Date.now();
    const elapsed = now - then; // calc elapsed time since last loop
    if (elapsed > fpsInterval) { // if enough time has elapsed, draw the next frame
      then = now - (elapsed % fpsInterval); // Get ready for next frame by setting then=now.   Also, adjust for fpsInterval not being multiple of 16.67

      //frame capped code here
      if (checkVisible(canvas) && rockets.isOn) {
        if (document.getElementById("time").value != 0) {
          rockets.t1 += 1 / rockets.gamma;
          rockets.t2 += 1;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRocket(ctx, 20, 20, rockets.t1, 1 / rockets.gamma, Number(document.getElementById("v_time").value / rockets.gamma));
        drawRocket(ctx, 320, 20, rockets.t2, 1, Number(document.getElementById("time").value));
      }
    }
  }

};
solver();





//_____________________________________________________________________
//_____________________________________________________________________
//_____________________________________________________________________
//_____________________________________________________________________
//relative motion
const relative = function () {
  var canvas = document.getElementById("relative");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;

  const settings = {
    wallWidth: 200,
    time: 0,
    moveScale: 2
  };

  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars[i] = {
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random()
    }
  }

  function drawStars() {
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    for (let i = 0, len = stars.length; i < len; i++) {
      ctx.moveTo(stars[i].x, stars[i].x)
      ctx.arc(stars[i].x, stars[i].y, 1, 0, 2 * Math.PI);
    }
    ctx.fillStyle = "#fff"
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  const rocket1 = {
    position: {
      x: canvas.width / 2 - 300,
      y: 25
    },
    velocity: {
      x: 0.95,
      y: 0
    },
    pov: false,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    }
  };

  const rocket2 = {
    position: {
      x: canvas.width / 2 - 300,
      y: 175
    },
    velocity: {
      x: 0.4,
      y: 0
    },
    pov: false,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    }
  };

  const earth = {
    position: {
      x: canvas.width / 2,
      y: 350
    },
    velocity: {
      x: 0,
      y: 0
    },
    pov: true,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    },
    draw: function (x, y, r = 240, color = "#69c") {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y + 200, r, 0, 2 * Math.PI * 60);
      ctx.fill();
    }
  };

  //___________________get mouse input___________________
  const mouse = {
    x: 0,
    y: 0
  };
  canvas.onmousemove = function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    //cycle observers
    if (mouse.y > 150) {
      if (mouse.y > 300) {
        rocket1.pov = false;
        rocket2.pov = false;
        earth.pov = true;
      } else {
        rocket1.pov = false;
        rocket2.pov = true;
        earth.pov = false;
      }
    } else {
      rocket1.pov = true;
      rocket2.pov = false;
      earth.pov = false;
    }
  };

  function drawFocus() {
    if (rocket1.pov) {
      ctx.strokeStyle = "#2B2D42" //"#D90429"
      ctx.lineWidth = 3
      ctx.beginPath();
      ctx.arc(rocket1.position.x + 80, rocket1.position.y + 50, 45, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (rocket2.pov) {
      ctx.strokeStyle = "#2B2D42" //"#D90429"
      ctx.lineWidth = 3
      ctx.beginPath();
      ctx.arc(rocket2.position.x + 80, rocket2.position.y + 50, 45, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (earth.pov) {
      ctx.strokeStyle = "#9cf"
      ctx.lineWidth = 5
      ctx.beginPath();
      ctx.arc(earth.position.x, earth.position.y + 200, 240, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }


  //___________________animation loop ___________________
  function cycle() {
    if (checkVisible(canvas)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRocket(ctx, rocket1.position.x, rocket1.position.y, settings.time);
      drawRocket(ctx, rocket2.position.x, rocket2.position.y, settings.time);
      earth.draw(earth.position.x, earth.position.y);
      drawStars();
      //move
      settings.time++;
      rocket1.position.x += settings.moveScale * (rocket1.velocity.x * !rocket1.pov - rocket2.velocity.x * rocket2.pov - earth.velocity.x * earth.pov);
      rocket2.position.x += settings.moveScale * (rocket2.velocity.x * !rocket2.pov - rocket1.velocity.x * rocket1.pov - earth.velocity.x * earth.pov);
      earth.position.x += settings.moveScale * (earth.velocity.x * !earth.pov - rocket1.velocity.x * rocket1.pov - rocket2.velocity.x * rocket2.pov);
      //wall teleport
      rocket1.wall();
      rocket2.wall();
      earth.wall();
      drawFocus();
    }
    requestAnimationFrame(cycle);
  }
  requestAnimationFrame(cycle);
};
relative();






//_____________________________________________________________________
//_____________________________________________________________________
//_____________________________________________________________________
//_____________________________________________________________________
//_____________________________________________________________________
//special relativity motion
const special = function () {
  var canvas = document.getElementById("special");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;

  const settings = {
    wallWidth: 200,
    time: 0,
    moveScale: 1.4
  };

  //velocities are in terms of c
  const gammaCal = function (v1, v2) {
    const v = v1 - v2;
    return 1 / Math.sqrt(1 - v * v);
  };


  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars[i] = {
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random()
    }
  }

  function drawStars() {
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    for (let i = 0, len = stars.length; i < len; i++) {
      ctx.moveTo(stars[i].x, stars[i].x)
      ctx.arc(stars[i].x, stars[i].y, 1, 0, 2 * Math.PI);
    }
    ctx.fillStyle = "#fff"
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  const rocket1 = {
    position: {
      x: canvas.width / 2 - 300,
      y: 25
    },
    velocity: {
      x: 0.95,
      y: 0
    },
    time: 0,
    pov: false,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    }
  };

  const rocket2 = {
    position: {
      x: canvas.width / 2 - 300,
      y: 175
    },
    velocity: {
      x: 0.4,
      y: 0
    },
    time: 0,
    pov: false,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    }
  };

  const earth = {
    position: {
      x: canvas.width / 2,
      y: 350
    },
    velocity: {
      x: 0,
      y: 0
    },
    time: 0,
    pov: true,
    wall: function () {
      if (this.position.x < -settings.wallWidth) this.position.x = canvas.width + settings.wallWidth;
      if (this.position.x > canvas.width + settings.wallWidth) this.position.x = -settings.wallWidth;
    },
    draw: function (x, y, scale) {
      ctx.save();
      ctx.translate(x, y + 200);
      ctx.scale(scale, 1);
      ctx.fillStyle = "#69c";
      ctx.beginPath();
      ctx.arc(0, 0, 240, 0, 2 * Math.PI * 60);
      ctx.fill();
      ctx.restore();
    }
  };

  //___________________get mouse input___________________
  const mouse = {
    x: 0,
    y: 0
  };
  canvas.onmousemove = function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    //cycle observers
    if (mouse.y > 150) {
      if (mouse.y > 300) {
        rocket1.pov = false;
        rocket2.pov = false;
        earth.pov = true;
      } else {
        rocket1.pov = false;
        rocket2.pov = true;
        earth.pov = false;
      }
    } else {
      rocket1.pov = true;
      rocket2.pov = false;
      earth.pov = false;
    }
  };

  function drawFocus() {
    if (rocket1.pov) {
      ctx.strokeStyle = "#2B2D42" //"#D90429"
      ctx.lineWidth = 3
      ctx.beginPath();
      ctx.arc(rocket1.position.x + 80, rocket1.position.y + 50, 45, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (rocket2.pov) {
      ctx.strokeStyle = "#2B2D42" //"#D90429"
      ctx.lineWidth = 3
      ctx.beginPath();
      ctx.arc(rocket2.position.x + 80, rocket2.position.y + 50, 45, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (earth.pov) {
      ctx.strokeStyle = "#9cf"
      ctx.lineWidth = 5
      ctx.beginPath();
      ctx.arc(earth.position.x, earth.position.y + 200, 240, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }


  //___________________animation loop ___________________
  function cycle() {
    if (checkVisible(canvas)) {
      //move
      rocket1.time += 1 / gammaCal(rocket1.velocity.x * !rocket1.pov, rocket2.velocity.x * rocket2.pov + earth.velocity.x * earth.pov);
      rocket2.time += 1 / gammaCal(rocket2.velocity.x * !rocket2.pov, rocket1.velocity.x * rocket1.pov + earth.velocity.x * earth.pov);
      earth.time += 1 / gammaCal(earth.velocity.x * !earth.pov, rocket2.velocity.x * rocket2.pov + rocket1.velocity.x * rocket1.pov);
      rocket1.position.x += settings.moveScale * (rocket1.velocity.x * !rocket1.pov - rocket2.velocity.x * rocket2.pov - earth.velocity.x * earth.pov);
      rocket2.position.x += settings.moveScale * (rocket2.velocity.x * !rocket2.pov - rocket1.velocity.x * rocket1.pov - earth.velocity.x * earth.pov);
      earth.position.x += settings.moveScale * (earth.velocity.x * !earth.pov - rocket1.velocity.x * rocket1.pov - rocket2.velocity.x * rocket2.pov);
      //wall teleport
      rocket1.wall();
      rocket2.wall();
      earth.wall();
      //draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRocket(
        ctx,
        rocket1.position.x,
        rocket1.position.y,
        rocket1.time,
        1 / gammaCal(rocket1.velocity.x * !rocket1.pov, rocket2.velocity.x * rocket2.pov + earth.velocity.x * earth.pov)
      );

      drawRocket(
        ctx,
        rocket2.position.x,
        rocket2.position.y,
        rocket2.time,
        1 / gammaCal(rocket2.velocity.x * !rocket2.pov, rocket1.velocity.x * rocket1.pov + earth.velocity.x * earth.pov)
      );
      earth.draw(
        earth.position.x,
        earth.position.y,
        1 / gammaCal(earth.velocity.x * !earth.pov, rocket2.velocity.x * rocket2.pov + rocket1.velocity.x * rocket1.pov)
      );
      drawStars();
      drawFocus();
    }
    requestAnimationFrame(cycle);
  }
  requestAnimationFrame(cycle);
};
special();