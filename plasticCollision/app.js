var canvas, stage, self, percent = .79,
    marginVarNumber = 160,
    marginVar = marginVarNumber,
    controlBoxContainer, PI = Math.PI,
    toDeg = 180 / PI,
    toRad = PI / 180,
    X0 = 360,
    Y0 = 220,
    t = 0,
    dt = .01,
    dtInitial = dt,
    dtSlow = dt,
    factor = .5,
    playMovie = !1,
    framePlay = !1,
    xScale = 50,
    yScale = -xScale,
    vScale = .1,
    FScale = 1,
    pScale = 20,
    eScale = 1,
    energyScale = 5,
    vectorScale = 1,
    valuesText = new createjs.Text("", "12px Trebuchet MS");
valuesText.set({
    x: 360,
    y: 375
});
valuesText.set({
    textAlign: "center"
});
var valuesText2 = new createjs.Text("", "12px Trebuchet MS");
valuesText2.set({
    x: 360,
    y: Y0 + 50
});
valuesText2.set({
    textAlign: "center"
});
var R = 15 / xScale,
    YK1 = 80,
    XK1 = 150,
    hK1 = 20,
    m1 = 4,
    m2 = 1,
    b = 0,
    \u03b5 = 0,
    t0 = 0,
    x1, x2, x01 = -3,
    x02 = 3,
    v01 = 5,
    v02 = -5,
    v1, v2, v1Vec = createVector("#000099", !0, !1);
v1Vec.y = Y0 - 40;
var v1Text = v1TextCreate(),
    v2Vec = createVector("#000099", !0, !1);
v2Vec.y = Y0 - 50;
var v2Text = v2TextCreate(),
    VVec = createVector("#000099", !0, !1);
VVec.y = Y0 - 40;
var VText = VTextCreate(),
    p1Vec = createVector("#990099", !0, !1);
p1Vec.y = Y0 + 90;
var p1Text = p1TextCreate(),
    p2Vec = createVector("#990099", !0, !1);
p2Vec.y = p1Vec.y + 15;
var p2Text = p2TextCreate(),
    pVec = createVector("#000000", !0, !1);
pVec.y = p1Vec.y + 30;
var pText = pTextCreate(),
    K1Shape = new createjs.Shape,
    K2Shape = new createjs.Shape,
    EShape = new createjs.Shape,
    K1Text = K1TextCreate(),
    K2Text = K2TextCreate(),
    EText = ETextCreate(),
    energyContainer = new createjs.Container,
    momentumContainer = new createjs.Container,
    together = !1,
    justBefore = !1,
    justAfter, stopFlag = !1,
    energyFlag = !1,
    momentumFlag = !1;
energyContainer.visible = energyFlag;
momentumContainer.visible = momentumFlag;
var body = new createjs.Container,
    body1 = new createjs.Shape,
    body2 = new createjs.Shape;
body1.name = "body1";
body1.addEventListener("mousedown", mouseDownGen);
body1.addEventListener("pressup", pressUpGen);
body1.mouseChildren = !1;
body2.name = "body2";
body2.addEventListener("mousedown", mouseDownGen);
body2.addEventListener("pressup", pressUpGen);
body2.mouseChildren = !1;

function init() {
    stage = new createjs.Stage(document.getElementById("demoCanvas"));
    createjs.Touch.enable(stage);
    stage.enableMouseOver();
    stage.enableDOMEvents(!0);
    canvas = document.getElementById("demoCanvas");
    self = stage;
    controlBoxContainer = new createjs.Container;
    self.addChild(controlBoxContainer);
    var a = new createjs.DOMElement("foo");
    controlBoxContainer.addChild(a);
    controlBoxContainer.x = 2.5;
    controlBoxContainer.y = 2.5;
    a = new createjs.Shape;
    a.graphics.ss(1).s("#666666").mt(0, Y0 + 15.5).lt(720, Y0 + 15.5);
    for (var c =
            0; 72 >= c; c += 1) a.graphics.mt(10 * (c + 1), Y0 + 15.5).lt(10 * c, Y0 + 10 + 15.5);
    stage.addChild(a);
    stage.addChild(body1);
    stage.addChild(body2);
    stage.addChild(body);
    stage.addChild(v1Vec);
    stage.addChild(v2Vec);
    stage.addChild(VVec);
    stage.addChild(v1Text);
    stage.addChild(v2Text);
    stage.addChild(VText);
    momentumContainer.addChild(p1Vec);
    momentumContainer.addChild(p2Vec);
    momentumContainer.addChild(pVec);
    momentumContainer.addChild(p1Text);
    momentumContainer.addChild(p2Text);
    momentumContainer.addChild(pText);
    energyContainer.addChild(K1Shape);
    energyContainer.addChild(K2Shape);
    energyContainer.addChild(EShape);
    energyContainer.addChild(K1Text);
    energyContainer.addChild(K2Text);
    energyContainer.addChild(EText);
    stage.addChild(momentumContainer);
    stage.addChild(energyContainer);
    stage.addChild(valuesText);
    stage.addChild(valuesText2);
    createRegister();
    stage.addChild(\u03a8);
    addFunction();
    showHideVariables();
    handleComplete();
    initialize();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
    canvas.style.visibility =
        "visible";
    document.getElementById("variables").style.visibility = "visible"
}

function initialize() {
    drawBody();
    drawBody1();
    drawBody2();
    restart()
}

function alignCenter() {
    p1Vec.x = (720 - (m1 * v1 + m2 * v2) * vectorScale * pScale) / 2;
    XK1 = (720 - (.5 * m1 * v1 * v1 + .5 * m2 * v2 * v2) * vectorScale * energyScale) / 2
}

function restart() {
    isOk || stage.removeAllChildren();
    justAfter = justBefore = together = !1;
    t0 = t = 0;
    x1 = x01;
    x2 = x02;
    v1 = v01;
    v2 = v02;
    tc = (x02 - x01 - 2 * R) / (v1 - v2);
    0 > tc && (tc = 1E4);
    x = x01 + v01 * tc;
    alignCenter();
    positions()
}

function tick(a) {
    playMovie && (framePlay && (framePlay = playMovie = !1), 0 <= t + t0 + dt && (justAfter && 0 > dt ? (t = tc, t0 = 0, v1 = v01, v2 = v02, x1 = x01 + v1 * tc, x2 = x02 + v2 * tc, justBefore = !0, together = justAfter = !1) : justBefore && 0 < dt ? (t0 = tc, t = 0, justBefore = !1, together = justAfter = !0, x1 = x01 + v1 * tc, x2 = x02 + v2 * tc, x = x1 + R, a = (1 + \u03b5) * m1 * v1 / (m1 + m2) + (m2 - \u03b5 * m1) * v2 / (m1 + m2), v1 = (m1 - \u03b5 * m2) * v1 / (m1 + m2) + m2 * (1 + \u03b5) * v2 / (m1 + m2), v2 = a) : (justBefore = justAfter = !1, t0 = 0, together ? (t += dt, 0 == \u03b5 ? x = x01 + v01 * tc + v1 * t + R : (x1 = x01 + v01 * tc + v1 * t, x2 = x02 + v02 * tc +
        v2 * t)) : t + dt > tc ? (justBefore = !0, x1 = x01 + v1 * tc, x2 = x02 + v2 * tc, t = tc, stopFlag && ($("#play").trigger("click"), playMovie = !1)) : (t += dt, x1 = x01 + v1 * t, x2 = x02 + v2 * t)), positions()))
}

function positions() {
    X1 = X0 + x1 * xScale;
    X2 = X0 + x2 * xScale;
    X = X0 + x * xScale;
    v1Vec.x = X1;
    v2Vec.x = X2;
    VVec.x = X;
    body1.x = X1;
    body2.x = X2;
    body.x = X;
    v1Vec.setScaleX(v1 * vScale * vectorScale * 100);
    updateTextVector(v1Text, v1Vec, 10, 0);
    v2Vec.setScaleX(v2 * vScale * vectorScale * 100);
    updateTextVector(v2Text, v2Vec, 10, 0);
    VVec.setScaleX(v1 * vScale * vectorScale * 100);
    updateTextVector(VText, VVec, 10, 0);
    together ? 0 == \u03b5 ? (body1.visible = !1, body2.visible = !1, body.visible = !0, v2Text.visible = !1, v1Text.visible = !1, VText.visible = !0, v1Vec.setScaleX(0),
        v2Vec.setScaleX(0)) : (body1.visible = !0, body2.visible = !0, body.visible = !1, v2Text.visible = !0, v1Text.visible = !0, VText.visible = !1, VVec.setScaleX(0)) : (body1.visible = !0, body2.visible = !0, body.visible = !1, v2Text.visible = !0, v1Text.visible = !0, VText.visible = !1, VVec.setScaleX(0));
    valuesText.text = "v" + String.fromCharCode("0x2081") + " = " + v1.toFixed(1) + " м/с, υ" + String.fromCharCode("0x2082") + " = " + v2.toFixed(1) + " м/с";
    valuesText2.text = justBefore && stopFlag ? "Минимум перед столкновением" :
        justAfter && stopFlag ? "Сразу после столкновения" : "";
    drawEnergy();
    drawMomentum();
    stage.update()
}

function drawMomentum() {
    momentumFlag && (p2Vec.x = p1Vec.x + m1 * v1 * pScale * vectorScale, pVec.x = p1Vec.x, p1Vec.setScaleX(m1 * v1 * pScale * vectorScale), updateTextVector(p1Text, p1Vec, 12, 0), p2Vec.setScaleX(m2 * v2 * pScale * vectorScale), updateTextVector(p2Text, p2Vec, 12, 0), pVec.setScaleX((m1 * v1 + m2 * v2) * pScale * vectorScale), updateTextVector(pText, pVec, 12, 0), valuesText.text += ", p" + String.fromCharCode("0x2081") + " = " + (m1 * v1).toFixed(1) + " кгм/с, p" + String.fromCharCode("0x2082") + " = " + (m2 * v2).toFixed(1) + " кгм/с")
}

function drawEnergy() {
    K1Shape.graphics.clear();
    K2Shape.graphics.clear();
    EShape.graphics.clear();
    if (energyFlag) {
        var a = .5 * m1 * v1 * v1,
            c = .5 * m2 * v2 * v2,
            d = .5 * m1 * v01 * v01 + .5 * m2 * v02 * v02;
        K1Text.visible = 0 != Number(a.toFixed(3)) * vectorScale;
        K2Text.visible = 0 != Number(c.toFixed(3)) * vectorScale;
        EText.visible = EShape.visible = 0 != d * vectorScale;
        K1Shape.graphics.ss(1).s("#000").f("#000066").dr(XK1, YK1, a * energyScale * vectorScale, hK1);
        K2Shape.graphics.ss(1).s("#000").f("#006699").dr(XK1 + a * energyScale * vectorScale, YK1, c * energyScale *
            vectorScale, hK1);
        EShape.graphics.ss(1).s("#000").f("#F9F49C").dr(XK1, YK1 - 30, d * energyScale * vectorScale, hK1);
        K1Text.set({
            x: XK1 - 15,
            y: YK1 + hK1 / 2
        });
        K2Text.set({
            x: XK1 + (a + c) * energyScale * vectorScale + 15,
            y: YK1 + hK1 / 2
        });
        EText.set({
            x: XK1 - 15,
            y: YK1 - 20
        });
        valuesText.text += ", K" + String.fromCharCode("0x2081") + " = " + a.toFixed(1) + " Дж, K" + String.fromCharCode("0x2082") + " = " + c.toFixed(1) + " Дж"
    }
}

function drawBody() {
    body.removeAllChildren();
    var a = new createjs.Shape;
    a.graphics.f().s("#333").ss(1, 1, 1, 3, !0).p("AAGhwQgFgpA+ABQBBABAsAsQAsAsAAA+QAAA9gsAsQgsAsg+AAQg+AAAFgsQADgWABgbQgCAWgEAVQgKA3g+AAQg+AAgsgsQgsgsAAg+QAAg9AsgsQAsgsA+AAQA+AAAIAdQAAACABADgAANA3QACgaAAgdQAAgLAAgLIAAgKQgBgTgBgQIgDgUQgBgKgCgKQgBgDAAgC");
    a.setTransform(360, 210.5);
    var c = new createjs.Shape;
    c.graphics.f("#CCCCCC").s().p("AirBtQgsgsAAg+QAAg9AsgsQAsgsA+AAQA+AAAIAdIABAFIABAFIADAUIADAUIACAjIAAAKIAAALIAAALIgCA3QgCAWgEAVQgKA3g+AAQg+AAgsgsgAAJBoIAEgxIACg3IAAgLIAAgLIAAgKIgCgjIgDgUIgDgUIgBgFQgFgpA+ABQBBABAsAsQAsAsAAA+QAAA9gsAsQgsAsg+AAQg+AAAFgsgAANA3IAAAAg");
    c.setTransform(360, 210.5);
    var d = new createjs.Shape;
    d.graphics.f("#000000").s().p("ACVAzIAAgBQAMgLAFgHQAFgHAAgFQAAgFgDgCQgCgDgEgBQgEABgCACQgDACgBADIgBAAQAAgGAEgEQADgCAGAAQAFAAAEADQAEAEAAAEQAAAEgCADQgDAGgFAGIgLALIAMAAIAFgBIADgBIACgCIABAAIgDAJgAhfAzIAAgBIAEgBIACgBIAAgFIAAgZIAAgGIgBgBIgCgBIgDABIgBgBIALgFIACAAIAAAmIAAAFIABABIAEABIAAABgAADAeIgBgCIAAgiIgjAAIgCgCIAAgBIAAgCIACgBIAjAAIAAgkIABgBIABgBIACABIABABIAAAkIAkAAIABABIABACIgBABIgBACIgkAAIAAAiIgBACIgCABIgBgBgAB/AVQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIADgLIAFgTIACgHIAAgCIAAgCIgCgCQgCAAgDADQgJAIgHANQgEAJgFAOIgJAAIALgjIABgIIAAgDIgCgBIgEACQgEACgFAIQgGAHgDAHIgHAVIgJAAIAMgrIABgCIgBgDIgDgBIgFABIAAgCIAUgDIgHAbIAIgPQAGgIAFgCQAEgCADAAQADAAACACQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABIgBAIIgFAPQAKgSAJgIQAFgDAEAAQADAAACACQACABAAAEIgBAHIgHAXIgCAIIAAABIABABIADgBIAGgHIACABIgFAHIgHAGIgFABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAgAh1AVQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAAAgBIADgLIAFgTIACgHIAAgCIAAgCIgCgCQgCAAgDADQgJAIgHANQgEAJgFAOIgJAAIALgjIABgIIAAgDIgCgBIgEACQgEACgFAIQgGAHgDAHIgHAVIgJAAIAMgrIABgCIgBgDIgDgBIgFABIAAgCIAUgDIgHAbIAIgPQAGgIAFgCQAEgCADAAQADAAACACQABAAAAAAQAAABABAAQAAABAAABQAAAAAAABIgBAIIgFAPQAKgSAJgIQAFgDAEAAQADAAACACQACABAAAEIgBAHIgHAXIgCAIIAAABIABABIADgBIAGgHIACABIgFAHIgHAGIgFABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAAAg");
    d.setTransform(361, 212);
    body.addChild(c);
    body.addChild(d);
    body.addChild(a);
    body.regX = 360;
    body.regY = 210;
    body.y = Y0
}

function drawBody1() {
    body1.graphics.clear().ss(1).s("#666").f("#cccccc").dc(-1, -2, 15);
    body1.graphics.f("#000000").s().p("AAhAqIAAgBIAEgBIACgBIAAgFIAAgYIAAgHIgBgBIgCgBIgDABIgBgBIALgEIACAAIAAAlIAAAFIABABIAEABIAAABgAALAMQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIADgKIAFgUIACgHIAAgCIAAgCIgCgBQgCAAgDACQgJAIgGAOQgEAJgFANIgJAAIALgjIABgIIAAgDIgCAAIgEABQgEACgFAIQgGAIgDAHIgHAUIgJAAIAMgrIABgCIgBgCIgDgBIgFABIAAgDIAUgDIgHAbIAIgPQAGgHAFgDQAEgCADAAQADAAACACQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABIAAAIIgFAPQAJgSAJgHQAFgEAEAAQADAAACACQACABAAAEIgBAIIgHAXIgCAHIAAACIABAAIADgBIAGgGIACABIgFAGIgHAGIgFABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
    body1.regX = -1;
    body1.regY = -2;
    body1.y = Y0
}

function drawBody2() {
    body2.graphics.clear().ss(1).s("#666").f("#cccccc").dc(-1, -2, 15);
    body2.graphics.f("#000000").s().p("AAbAqIAAgBQAMgLAEgHQAFgGAAgGQAAgEgCgDQgDgDgEAAQgDAAgDACQgCACgCAEIgBAAQABgGADgDQAEgDAFAAQAFAAAEADQAEADAAAFIgCAHQgCAFgGAGIgKALIAMAAIAFAAIACgBIACgCIACAAIgEAIgAAEAMQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBIADgKIAFgTIACgIIAAgCIAAgCIgCgBQgCAAgDACQgHAIgHAOQgFAJgEANIgJAAIAKgjIACgIIgBgCIgCgBIgEABQgDADgGAHQgGAIgDAHIgHAUIgJAAIANgrIAAgCIgBgCIgDgBIgEABIgBgCIAVgEIgIAbIAJgPQAFgHAGgDQADgCADAAQADAAACACQACACAAADIgBAHIgEAPQAJgSAIgHQAFgEAFAAQAAAAABAAQABAAAAAAQABAAAAABQABAAAAABQACACAAAEIgBAHIgHAXIgCAHIABACIABAAIACgBQADgCADgEIACABIgFAGIgHAGIgFABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAg");
    body2.regX = -1;
    body2.regY = -2;
    body2.y = Y0
};