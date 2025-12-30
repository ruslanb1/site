﻿var canvas, stage, self, controlBoxContainer, mainWindowPercent = 0.71,
    percent = mainWindowPercent,
    marginVarNumber = 160,
    marginVar = marginVarNumber,
    PI = Math.PI,
    toDeg = 180 / PI,
    toRad = PI / 180,
    Y0 = 200,
    t = 0,
    dt = 1 / 30,
    dtt = 1 / 30,
    dtInitial = dt,
    dtSlow = dt,
    factor = .5,
    playMovie = !1,
    framePlay = !1,
    xScale = .05,
    yScale = .05,
    xSCALE = 20,
    FScale = 3.7,
    R = 8.314,
    N = 0,
    NA = 75,
    Nmax = NA,
    Velx = new Array,
    Vely = new Array,
    Vel = 0,
    Vrms = 0,
    Vrms2 = 0,
    i = 0,
    M = .004,
    dVel = 500,
    Velmax = 1e4,
    X0 = 155,
    n = 1.2 * R * Nmax / NA,
    p = 6,
    V = 4,
    T = 100 * p * V / n,
    γ = 5 / 3,
    particles = new createjs.Container,
    VScale = 18,
    W = 100,
    Radii = 1,
    bottomY = 310,
    topY = bottomY - V * VScale,
    H = bottomY - topY,
    XL = X0 - W / 2,
    Xmin = XL + Radii,
    Xmax = XL + W - Radii,
    Ymin = topY + Radii,
    Ymax = bottomY - Radii,
    xGraphText = new createjs.Shape,
    yGraphText = new createjs.Shape,
    topBox = new createjs.Shape;
topBox.name = "topBox", topBox.addEventListener("mousedown", mouseDownGen), topBox.addEventListener("pressup", pressUpGen);
var showMolecules = !(topBox.mouseChildren = !1);
particles.visible = showMolecules;
var pConstFlag = !1,
    VConstFlag = !1,
    TConstFlag = !1,
    QConstFlag = !1,
    gridFlag = !0,
    VSCALE = 30,
    pSCALE = -VSCALE,
    Lpx = VSCALE * iVmax,
    Hpx = Lpx / 2,
    TSCALE = Lpx / iTmax,
    YG = 220,
    XpV = 330,
    YpV = YG + Hpx,
    DYMinpV = YG + Hpx - YpV,
    DYMaxpV = 2 * Hpx - DYMinpV,
    xAxispV = new createjs.Container;
xAxispV.set({
    x: XpV,
    y: YpV
});
var yAxispV = new createjs.Container;
yAxispV.set({
    x: XpV,
    y: YpV
});
var plots = new createjs.Shape,
    plotsText = new createjs.Container,
    mainPlot = new createjs.Shape;
mainPlot.name = "mainPlot", mainPlot.addEventListener("mousedown", mouseDownGen), mainPlot.addEventListener("pressup", pressUpGen), mainPlot.mouseChildren = !1;
var weights = new createjs.Shape;
weights.x = XL + W / 2;
var valuesText = new createjs.Text("", "12px GOST_A");
valuesText.set({
    x: XL - 35,
    rotation: -90,
    textAlign: "center"
});
var hotSourceText = new createjs.Text("Тепловой бак", "9px GOST_A");
hotSourceText.set({
    x: XL + W / 2,
    y: bottomY + 55 - 12,
    textAlign: "center"
});
var infoText = new createjs.Text("", "12px GOST_A");
infoText.set({
    x: X0,
    y: bottomY + 65,
    textAlign: "center"
});
var titleText = new createjs.Text("ИЗОБАРНЫЙ ПРОЦЕСС", "12px GOST_A");
titleText.set({
    x: X0,
    y: 45,
    textAlign: "center"
});
var pressureText = new createjs.Text("10 атм", "12px GOST_A");
pressureText.set({
    x: XL + W + 60,
    y: bottomY - 50,
    textAlign: "center"
});
var temperatureText = new createjs.Text("T = 200 K", "12px GOST_A");
temperatureText.set({
    x: XL + W / 2,
    y: topY - 15,
    textAlign: "center"
});
var pVGraphContainer = new createjs.Container,
    point = makeDragPoint("#000", "pvPoint", 2.5);
point.addEventListener("mousedown", mouseDownGen), point.addEventListener("pressup", pressUpGen), point.mouseChildren = !1;
var points = new createjs.Container,
    pVShapeMask = new createjs.Shape;
pVShapeMask.graphics.drawRect(XpV - 3, YG - Hpx - 3, Lpx + 7, 2 * Hpx), points.mask = pVShapeMask;
var graphIndex = 0,
    boxAndGas = new createjs.Container,
    energyVectorScale = .035,
    Q1Vec = createVector("#ff0000", !1, !1);
Q1Vec.set({
    x: XL + 25,
    y: bottomY,
    rotation: -90
});
var Q2Vec = createVector("#ff0000", !1, !1);
Q2Vec.set({
    x: XL + 50,
    y: bottomY,
    rotation: -90
});
var Q3Vec = createVector("#ff0000", !1, !1);
Q3Vec.set({
    x: XL + 75,
    y: bottomY,
    rotation: -90
});
var FVec = createVector("#0000FF", !1, !1);
FVec.set({
    x: XL + 50,
    y: bottomY,
    rotation: -90
});
var ΔxVec = createVector("#FF0000", !1, !1);
ΔxVec.set({
    x: XL - 10,
    y: bottomY,
    rotation: -90
});
var FVecText = FVecTextShape(),
    ΔxVecText = ΔxVecTextShape(),
    vectors = new createjs.Container;
vectors.visible = !1;
var dQVecText = dQVecTextShape(),
    λ = 200,
    arrayOfPressure = [],
    hotSource = new createjs.Shape,
    galvanometer = new createjs.Container;
galvanometer.set({
    x: XL + W + 50 + 10,
    y: bottomY - 5
});
var indicator = new createjs.Shape,
    ps = p,
    Vs = V,
    area = new createjs.Shape;

function init() {
    stage = new createjs.Stage(document.getElementById("demoCanvas")), createjs.Touch.enable(stage), stage.enableMouseOver(), stage.enableDOMEvents(!0), canvas = document.getElementById("demoCanvas"), self = stage, controlBoxContainer = new createjs.Container, self.addChild(controlBoxContainer);
    var e = new createjs.DOMElement("foo");
    controlBoxContainer.addChild(e), controlBoxContainer.x = 2.5, controlBoxContainer.y = 2.5;
    var t = 220,
        a = 20,
        o = new createjs.Shape;
    o.graphics.ss(1).s("#666666").mt(XL, bottomY).lt(XL, bottomY - t).lt(XL - a, bottomY - t).lt(XL - a, bottomY + a).lt(XL + W + a, bottomY + a).lt(XL + W + a, bottomY - t).lt(XL + W, bottomY - t).lt(XL + W, bottomY).cp(), topBox.graphics.ss(1).s("#666666").f("#fff").mt(0, 0).lt(-W / 2, 0).lt(-W / 2, -a).lt(W / 2, -a).lt(W / 2, 0).cp(), topBox.x = X0, topBox.y = topY, pVGraphContainer.addChild(area), pVGraphContainer.addChild(xAxispV), pVGraphContainer.addChild(yAxispV), pVGraphContainer.addChild(plots), pVGraphContainer.addChild(mainPlot), pVGraphContainer.addChild(pVShapeMask), pVGraphContainer.addChild(plotsText), pVGraphContainer.addChild(points), pVGraphContainer.addChild(point), pVGraphContainer.addChild(xGraphText), pVGraphContainer.addChild(yGraphText), vectors.addChild(FVec), vectors.addChild(ΔxVec), vectors.addChild(FVecText), vectors.addChild(ΔxVecText), boxAndGas.addChild(particles), boxAndGas.addChild(o), boxAndGas.addChild(topBox), boxAndGas.addChild(galvanometer), boxAndGas.addChild(hotSource), pVGraphContainer.addChild(Q1Vec), pVGraphContainer.addChild(Q2Vec), pVGraphContainer.addChild(Q3Vec), boxAndGas.addChild(weights), boxAndGas.addChild(vectors), boxAndGas.addChild(pressureText), boxAndGas.addChild(temperatureText), pVGraphContainer.addChild(dQVecText), boxAndGas.addChild(hotSourceText), boxAndGas.addChild(infoText), boxAndGas.addChild(valuesText), stage.addChild(boxAndGas), stage.addChild(pVGraphContainer), stage.addChild(titleText), drawHotSource(), createGalvanometer(), createRegister(), stage.addChild(Ψ), addFunction(), showHideVariables(), handleComplete(), initialize(), createjs.Ticker.timingMode = createjs.Ticker.RAF, createjs.Ticker.addEventListener("tick", tick), canvas.style.visibility = "visible", document.getElementById("variables").style.visibility = "visible"
}

function initialize() {
    arrangeLimits(), putPointInLimits(), setSlidersAndSpinersValues(), drawBox(), updateThePointPos(), drawAllAxis(), drawArray(), restart()
}

function restart() {
    isOk || stage.removeAllChildren(), t = 0, ps = p, Vs = V, area.graphics.clear(), ΔQ = 0, vectorLen = 0, Cv = 1 / (γ - 1), Cp = Cv + 1, positions()
}

function tick(e) {
    var a;
    playMovie && (framePlay = framePlay && (playMovie = !1), t += dt, a = λ * dt / (n * Cp), ΔQ += λ * dt, vectorLen = fixPeriod(vectorLen + λ * dt * energyVectorScale, 0 < λ ? 50 : -50), ((V = n * (T += a) / 100 / p) > Vmax || V < Vmin || T > Tmax || T < Tmin) && (vectorLen = 0, putPointInLimits(), $("#play").trigger("click")), setSlidersAndSpinersValues(), drawBox(), updateThePointPos()), moveParticles(), positions()
}

function moveParticles() {
    if (showMolecules) {
        for (var e = particles.numChildren - 1, t = 0; t <= e; t++) {
            particles.getChildAt(t).collided = !1
        }
        for (t = 0; t <= e; t++)
            for (var a = particles.getChildAt(t), o = t + 1; o <= e; o++) {
                var r = particles.getChildAt(o);
                if (!r.collided) {
                    var n = a.x - r.x,
                        i = a.y - r.y,
                        s = Math.sqrt(n * n + i * i);
                    if (s < 2 * Radii) {
                        r.collided = !0;
                        var d = Math.atan2(r.y - a.y, r.x - a.x),
                            l = a.Velx * Math.cos(d) + a.Vely * Math.sin(d),
                            c = a.Vely * Math.cos(d) - a.Velx * Math.sin(d),
                            x = r.Velx * Math.cos(d) + r.Vely * Math.sin(d),
                            p = r.Vely * Math.cos(d) - r.Velx * Math.sin(d),
                            V = l,
                            l = x;
                        v2x = (x = V) * Math.cos(d) - p * Math.sin(d), v2y = x * Math.sin(d) + p * Math.cos(d), v1x = l * Math.cos(d) - c * Math.sin(d), v1y = l * Math.sin(d) + c * Math.cos(d), a.Velx = v1x, a.Vely = v1y, r.Velx = v2x, r.Vely = v2y, r.x = r.x + (2 * Radii - s) * Math.cos(d), r.y = r.y + (2 * Radii - s) * Math.sin(d);
                        break
                    }
                }
            }
        finalPos()
    }
}

function finalPos() {
    for (var e = particles.numChildren - 1, t = 0; t <= e; t++) {
        var a = particles.getChildAt(t),
            o = dtt * xScale * a.Velx,
            r = dtt * yScale * a.Vely,
            n = a.x + o;
        Xmax < n ? (a.x = 2 * Xmax - n, a.Velx = -a.Velx) : n < Xmin ? (a.x = 2 * Xmin - n, a.Velx = -a.Velx) : a.x = n;
        var i = a.y + r;
        Ymax < i ? (a.y = 2 * Ymax - i, a.Vely = -a.Vely) : i < Ymin ? (a.y = 2 * Ymin - i, a.Vely = -a.Vely) : a.y = i
    }
}

function positions() {
    FVec.setScaleX(p * FScale), FVec.set({
        y: topY - 20
    }), updateTextVector(FVecText, FVec, 10, 0), ΔxVec.setScaleX((V - Vs) * VScale), ΔxVec.set({
        y: bottomY - Vs * VScale
    }), updateTextVector(ΔxVecText, ΔxVec, 10, 0), playMovie ? (Q1Vec.setScaleX(vectorLen), Q1Vec.set({
        y: bottomY + (0 < λ ? 30 : -30)
    }), Q2Vec.setScaleX(vectorLen), Q2Vec.set({
        y: bottomY + (0 < λ ? 30 : -30)
    }), updateTextVector(dQVecText, Q2Vec, 12, 0), Q3Vec.setScaleX(vectorLen), Q3Vec.set({
        y: bottomY + (0 < λ ? 30 : -30)
    }), 0 == graphIndex && drawArea(p)) : (Q1Vec.setScaleX(0), Q2Vec.setScaleX(0), updateTextVector(dQVecText, Q2Vec, 10, 0), Q3Vec.setScaleX(0)), valuesText.text = "V = " + V.toFixed(1) + " л", infoText.text = "t = " + t.toFixed(1) + " с, ΔQ = " + (ΔQ / 1e3).toFixed(1) + " кДж", drawHotSource(), stage.update()
}
area.set({
    alpha: .4,
    visible: !1
});