helpText.text = "Приложение, с помощью которого мы можем изучать свободное падение и вертикальный бросок. Мы можем выбрать теоретическую или экспериментальную среду, выбрать одно или два тела для сравнения, перетащить ось (линейку), тело или тела, а также изменить масштабы и место проведения эксперимента. Нажав на кнопку камеры, мы можем сделать копии графиков для сравнения. Чтобы удалить копии, нажмите на кнопку x. Если отметить опцию Trace, то через каждый промежуток времени, равный 1/5 основной временной шкалы графиков (то есть для каждого маленького квадратика), будет создаваться точка, отображающая положение тела в этот момент. Объекты считаются сферами. Трение пропорционально скорости. Вязкость слишком высока для получения более наглядных результатов."

var canvas, stage, self, controlBoxContainer, marginVarNumber = 155,
    marginVar = marginVarNumber,
    PI = Math.PI,
    toDeg = 180 / PI,
    toRad = PI / 180,
    X0 = 80,
    Y0 = 80,
    t = 0,
    dt = 1 / 60,
    dtInitial = dt,
    dtSlow = dt,
    factor = .5,
    playMovie = !1,
    framePlay = !1,
    xScale = 28,
    yScale = -xScale,
    vScale = 2,
    aScale = 5,
    vectorScale = 1,
    images = new createjs.Container;
images.set({
    x: 623.5,
    y: 96
});
var valuesText = new createjs.Text("", "12px Trebuchet MS");
valuesText.set({
    x: 360,
    y: 375,
    textAlign: "center"
});
var planetsText = new createjs.Text("Земля", "bold 16px Trebuchet MS");
planetsText.set({
    x: 360,
    y: 45,
    textAlign: "center"
});
var b, x, y, x1, y1, x2, y2, yMin, X, Y, v1, v2, tEnd, tC, YGround = 360,
    selectedBody = 1,
    gravity = new Array(3.7, 8.9, 10, 1.6, 3.8, 24.8, 10.4, 8.7, 11.2, 273.95),
    planets = new Array("Меркурий", "Венера", "Земля", "Луна", "Марс", "Юпитер", "Сатурн", "Нептун", "Уран", "Солнце"),
    m1 = 1,
    m2 = 10,
    g = -10,
    η = 0,
    ρ = 7874,
    λ = 6 * PI * η * Math.pow(3 / (4 * PI * ρ), 1 / 3),
    y01 = 0,
    Y01 = Y0 + y01 * yScale,
    y02 = 0,
    Y02 = Y0 + y02 * yScale,
    v01 = 0,
    v02 = 0,
    posUp = !0,
    ε = -1,
    oneBody = !0,
    point1 = new createjs.Shape;
point1.addEventListener("mousedown", mouseDownGen), point1.addEventListener("pressup", pressUpGen), point1.mouseChildren = !1, point1.name = "point1", point1.alpha = .5;
var point2 = new createjs.Shape;
point2.addEventListener("mousedown", mouseDownGen), point2.addEventListener("pressup", pressUpGen), point2.mouseChildren = !1, point2.name = "point2", point2.alpha = .5;
var yAxis = new createjs.Container;
yAxis.addEventListener("mousedown", mouseDownGen), yAxis.addEventListener("pressup", pressUpGen), yAxis.mouseChildren = !1, yAxis.set({
    x: X0,
    visible: !0,
    name: "yAxis"
});
var ground = new createjs.Shape,
    xStartGraphs = new createjs.Container,
    vStartGraphs = new createjs.Container,
    xGraphs = new createjs.Container,
    vGraphs = new createjs.Container,
    xCloneGraphs = new createjs.Container,
    vCloneGraphs = new createjs.Container;
xCloneGraphs.alpha = .5, vCloneGraphs.alpha = .5;
var v1Vec = createVector("#0000ff", !1, !0);
v1Vec.rotation = -90;
var v1VecText = new createjs.Shape,
    v2Vec = createVector("#ff0000", !1, !0);
v2Vec.rotation = -90;
var k, dT, v2VecText = v2TextShape(),
    stageUpdateFlag = !1,
    ruler = new createjs.Container;
ruler.set({
    x: X0,
    y: Y0 + 5 * xScale,
    rotation: 90,
    alpha: .75,
    visible: !1
}), ruler.name = "ruler", ruler.addEventListener("mousedown", mouseDownRuler), ruler.addEventListener("pressup", pressUpRuler);
var gridFlag = !0,
    tSCALE = 87,
    vSCALE = -4,
    xSCALE = -8,
    Hpx = 105,
    Lpx = 140,
    YG = 200,
    Xx = 180,
    Yx = YG,
    Xv = 400,
    Yv = YG,
    DYMinX = +Hpx,
    DYMaxX = +Hpx,
    DYMinV = +Hpx,
    DYMaxV = +Hpx,
    DYMinA = +Hpx,
    DYMaxA = +Hpx,
    tAxisX = new createjs.Container;
tAxisX.set({
    x: Xx,
    y: Yx
});
var tAxisV = new createjs.Container;
tAxisV.set({
    x: Xv,
    y: Yv
});
var yAxisX = new createjs.Container;
yAxisX.set({
    x: Xx,
    y: Yx
});
var yAxisV = new createjs.Container;
yAxisV.set({
    x: Xv,
    y: Yv
}), tAxisX.name = "tAxisX", tAxisX.addEventListener("mousedown", mouseDownGen), tAxisX.addEventListener("pressup", pressUpGen), tAxisX.mouseChildren = !1, tAxisV.name = "tAxisV", tAxisV.addEventListener("mousedown", mouseDownGen), tAxisV.addEventListener("pressup", pressUpGen), tAxisV.mouseChildren = !1;
var xaPlot = new createjs.Shape;
xaPlot.set({
    x: Xx,
    y: Yx
});
var xbPlot = new createjs.Shape;
xbPlot.set({
    x: Xx,
    y: Yx
});
var x1Plot = new createjs.Shape;
x1Plot.set({
    x: Xx,
    y: Yx
});
var x2Plot = new createjs.Shape;
x2Plot.set({
    x: Xx,
    y: Yx
});
var vaPlot = new createjs.Shape;
vaPlot.set({
    x: Xv,
    y: Yv
});
var vbPlot = new createjs.Shape;
vbPlot.set({
    x: Xv,
    y: Yv
});
var v1Plot = new createjs.Shape;
v1Plot.set({
    x: Xv,
    y: Yv
});
var v2Plot = new createjs.Shape;
v2Plot.set({
    x: Xv,
    y: Yv
});
var x1Point = makeDragPoint("#000", "xPoint", 2.8),
    v1Point = makeDragPoint("#000", "vPoint", 2.8),
    x2Point = makeDragPoint("#000", "xPoint", 2.8),
    v2Point = makeDragPoint("#000", "vPoint", 2.8),
    v1DotLines = new createjs.Shape,
    x1DotLines = new createjs.Shape,
    v2DotLines = new createjs.Shape,
    x2DotLines = new createjs.Shape,
    xShapeMask = new createjs.Shape;
xShapeMask.graphics.drawRect(Xx - 15, YG - Hpx, Lpx + 15.2, 2 * Hpx), xaPlot.mask = xShapeMask, xbPlot.mask = xShapeMask, x1Plot.mask = xShapeMask, x2Plot.mask = xShapeMask, x1Point.mask = xShapeMask, x2Point.mask = xShapeMask, x1DotLines.mask = xShapeMask, x2DotLines.mask = xShapeMask;
var vShapeMask = new createjs.Shape;
vShapeMask.graphics.drawRect(Xv - 15, YG - Hpx, Lpx + 15.2, 2 * Hpx), vaPlot.mask = vShapeMask, vbPlot.mask = vShapeMask, v1Plot.mask = vShapeMask, v2Plot.mask = vShapeMask, v1Point.mask = vShapeMask, v2Point.mask = vShapeMask, v1DotLines.mask = vShapeMask, v2DotLines.mask = vShapeMask;
var vGraphText = vGraphTextShape(),
    xGraphText = xGraphTextShape(),
    tvGraphText = tGraphTextShape(),
    txGraphText = tGraphTextShape(),
    txShapeMask = new createjs.Shape;
txShapeMask.graphics.drawRect(Xx - 5, YG - Hpx, Lpx + 5 + 12, 2 * Hpx), tAxisX.mask = txShapeMask;
var tvShapeMask = new createjs.Shape;
tvShapeMask.graphics.drawRect(Xv - 5, YG - Hpx, Lpx + 5 + 12, 2 * Hpx), tAxisV.mask = tvShapeMask;
var xGraphContainer = new createjs.Container;
xGraphContainer.visible = !0;
var vGraphContainer = new createjs.Container;
vGraphContainer.visible = !0;
var pointClones = new createjs.Container;

function init() {
    stage = new createjs.Stage(document.getElementById("demoCanvas")), createjs.Touch.enable(stage), stage.enableMouseOver(), stage.enableDOMEvents(!0), canvas = document.getElementById("demoCanvas"), self = stage, controlBoxContainer = new createjs.Container, self.addChild(controlBoxContainer);
    var e = new createjs.DOMElement("foo");
    controlBoxContainer.addChild(e), controlBoxContainer.x = 2.5, controlBoxContainer.y = 2.5, stage.addChild(images);
    for (var t = 0; t <= 9; t++) {
        var a = new Image;
        a.src = dataImage[t], a.onload = handleImageLoad
    }
    stage.addChild(ground), stage.addChild(yAxis), stage.addChild(ruler), stage.addChild(valuesText), stage.addChild(planetsText), stage.addChild(point1), stage.addChild(point2), xGraphContainer.addChild(tAxisX), xGraphContainer.addChild(yAxisX), vGraphContainer.addChild(tAxisV), vGraphContainer.addChild(yAxisV), xStartGraphs.addChild(xbPlot), xStartGraphs.addChild(xaPlot), xGraphs.addChild(x2Plot), xGraphs.addChild(x1Plot), vStartGraphs.addChild(vbPlot), vStartGraphs.addChild(vaPlot), vGraphs.addChild(v2Plot), vGraphs.addChild(v1Plot), xGraphContainer.addChild(xStartGraphs), vGraphContainer.addChild(vStartGraphs), xGraphContainer.addChild(xGraphs), vGraphContainer.addChild(vGraphs), xGraphContainer.addChild(xCloneGraphs), xGraphContainer.addChild(vCloneGraphs), vGraphContainer.addChild(v1DotLines), xGraphContainer.addChild(x1DotLines), vGraphContainer.addChild(v2DotLines), xGraphContainer.addChild(x2DotLines), xGraphContainer.addChild(x1Point), vGraphContainer.addChild(v1Point), xGraphContainer.addChild(x2Point), vGraphContainer.addChild(v2Point), xGraphContainer.addChild(xShapeMask), vGraphContainer.addChild(vShapeMask), vGraphContainer.addChild(vGraphText), xGraphContainer.addChild(xGraphText), vGraphContainer.addChild(tvGraphText), xGraphContainer.addChild(txGraphText), stage.addChild(xGraphContainer), stage.addChild(vGraphContainer), stage.addChild(v1Vec), stage.addChild(v2Vec), stage.addChild(v1VecText), stage.addChild(v2VecText), stage.addChild(pointClones), createRegister(), stage.addChild(Ψ), addFunction(), showHideVariables(), handleComplete(), initialize(), createjs.Ticker.timingMode = createjs.Ticker.RAF, createjs.Ticker.addEventListener("tick", tick), canvas.style.visibility = "visible", document.getElementById("variables").style.visibility = "visible"
}

function initialize() {
    drawRuler(), afterMassUpdate(), drawGraoud(), drawAxis(), vGraphText.set({
        x: Xv,
        y: YG - Hpx - 11 - 8
    }), xGraphText.set({
        x: Xx,
        y: YG - Hpx - 11 - 8
    }), tvGraphText.set({
        x: Xv + Lpx + 26,
        y: Yv
    }), txGraphText.set({
        x: Xx + Lpx + 26,
        y: Yx
    }), restart()
}

function restart() {
    if (isOk || stage.removeAllChildren(), oneBody) {
        var e = 0;
        vTextShape()
    } else {
        e = 60;
        v1TextShape()
    }
    point1.x = v1Vec.x = X0, point2.x = v2Vec.x = X0 + e, y1 = y01, v1 = v01, y2 = y02, v2 = v02, tC = void(t = 0), x2Plot.visible = v2Plot.visible = point2.visible = !oneBody, xbPlot.visible = vbPlot.visible = point2.visible = !oneBody, v2VecText.visible = v2Vec.visible = !oneBody, x2Point.visible = v2Point.visible = x2DotLines.visible = v2DotLines.visible = !oneBody, x1Plot.graphics.clear().ss(2).s("#0000ff").moveTo(0, y01 * ε * xSCALE), x2Plot.graphics.clear().ss(2).s("#ff0000").moveTo(0, y02 * ε * xSCALE), v1Plot.graphics.clear().ss(2).s("#0000ff").moveTo(0, v01 * ε * vSCALE), v2Plot.graphics.clear().ss(2).s("#ff0000").moveTo(0, v02 * ε * vSCALE), drawAllGraphs(), pointClones.removeAllChildren(), k = 0, dT = tAxisX.step / 5, positions()
}

function tick(e) {
    if (stageUpdateFlag && stage.update(), playMovie) {
        var a, s;
        if (framePlay = framePlay && (playMovie = !1), 0 <= t + dt) {
            if (oneBody) {
                var n = getPos(g, m1, λ * Math.pow(m1, 1 / 3), y1, v1, t, dt);
                t += dt, y1 = n.y, v1 = n.v, a = n.t, null == n.t ? (x1Plot.graphics.lineTo(t * tSCALE, y1 * ε * xSCALE), v1Plot.graphics.lineTo(t * tSCALE, v1 * ε * vSCALE)) : (x1Plot.graphics.lineTo(n.t * tSCALE, y1 * ε * xSCALE), v1Plot.graphics.lineTo(n.t * tSCALE, v1 * ε * vSCALE), oneBody && (t = a))
            } else {
                n = getPos(g, m1, λ * Math.pow(m1, 1 / 3), y1, v1, t, dt);
                var i = getPos(g, m2, λ * Math.pow(m2, 1 / 3), y2, v2, t, dt);
                t += dt, y1 = n.y, v1 = n.v, y2 = i.y, v2 = i.v, null == a && null != n.t && (a = n.t), null == n.t ? (x1Plot.graphics.lineTo(t * tSCALE, y1 * ε * xSCALE), v1Plot.graphics.lineTo(t * tSCALE, v1 * ε * vSCALE)) : (x1Plot.graphics.lineTo(n.t * tSCALE, y1 * ε * xSCALE), v1Plot.graphics.lineTo(n.t * tSCALE, v1 * ε * vSCALE).mt(n.t * tSCALE, 0).lt(t * tSCALE, 0), v1 = 0), null == s && null != i.t && (s = i.t), null == i.t ? (x2Plot.graphics.lineTo(t * tSCALE, y2 * ε * xSCALE), v2Plot.graphics.lineTo(t * tSCALE, v2 * ε * vSCALE)) : (x2Plot.graphics.lineTo(i.t * tSCALE, y2 * ε * xSCALE), v2Plot.graphics.lineTo(i.t * tSCALE, v2 * ε * vSCALE).mt(i.t * tSCALE, 0).lt(t * tSCALE, 0), v2 = 0)
            }
            oneBody ? null != a && $("#play").trigger("click") : null != a && null != s && (t = Math.max(a, s), $("#play").trigger("click"))
        }
        positions()
    }
}

function positions() {
    point1.y = Y0 + y1 * yScale, point2.y = Y0 + y2 * yScale, x1Point.x = Xx + t * tSCALE, x1Point.y = Yx + y1 * ε * xSCALE, x2Point.x = Xx + t * tSCALE, x2Point.y = Yx + y2 * ε * xSCALE, v1Point.x = Xv + t * tSCALE, v1Point.y = Yv + v1 * ε * vSCALE, v2Point.x = Xv + t * tSCALE, v2Point.y = Yv + v2 * ε * vSCALE, v1Vec.setScaleX(v1 * vScale * vectorScale), v1Vec.y = point1.y, updateTextVector(v1VecText, v1Vec, 0, 0 < v1 ? 8 : -8), v2Vec.setScaleX(v2 * vScale * vectorScale), v2Vec.y = point2.y, updateTextVector(v2VecText, v2Vec, 0, 0 < v2 ? 8 : -8), x1DotLines.graphics.clear(), v1DotLines.graphics.clear(), x2DotLines.graphics.clear(), v2DotLines.graphics.clear(), t < tEnd && DYMinX / xSCALE < ε * y1 && ε * y1 < -DYMaxX / xSCALE && x1DotLines.graphics.ss(1).s("#666").sd([3, 3], 3).mt(Xx, Yx + y1 * ε * xSCALE).lt(Xx + t * tSCALE, Yx + y1 * ε * xSCALE).lt(Xx + t * tSCALE, Yx), t < tEnd && DYMinX / xSCALE < ε * y2 && ε * y2 < -DYMaxX / xSCALE && x2DotLines.graphics.ss(1).s("#666").sd([3, 3], 3).mt(Xx, Yx + y2 * ε * xSCALE).lt(Xx + t * tSCALE, Yx + y2 * ε * xSCALE).lt(Xx + t * tSCALE, Yx), t < tEnd && DYMinV / vSCALE < ε * v1 && ε * v1 < -DYMaxV / vSCALE && v1DotLines.graphics.ss(1).s("#666").sd([3, 3], 3).mt(Xv, Yv + v1 * ε * vSCALE).lt(Xv + t * tSCALE, Yv + v1 * ε * vSCALE).lt(Xv + t * tSCALE, Yv), t < tEnd && DYMinV / vSCALE < ε * v2 && ε * v2 < -DYMaxV / vSCALE && v2DotLines.graphics.ss(1).s("#666").sd([3, 3], 3).mt(Xv, Yv + v2 * ε * vSCALE).lt(Xv + t * tSCALE, Yv + v2 * ε * vSCALE).lt(Xv + t * tSCALE, Yv), valuesText.text = "t = " + t.toFixed(3) + " с", k <= t / dT && (k++, pointClones.visible && addClone()), stage.update()
}

function handleImageLoad(e) {
    var t = new createjs.Bitmap(e.target);
    t.scaleX = .5, t.scaleY = .5, t.regX = 50, t.regY = 50, t.addEventListener("rollover", mouseOverGen), t.addEventListener("rollout", mouseOutGen), t.addEventListener("click", clickGen), t.mouseChildren = !1, images.addChild(t);
    var a = images.numChildren - 1;
    t.idx = a, t.x = 52 * Math.floor(a / 5), t.y = a % 5 * 52, stage.update()
}

function drawAllGraphs() {
    tEnd = Lpx / tSCALE, tAxisX.tAxisCreate(Lpx / tSCALE, tSCALE), yAxisX.yAxisCreate(DYMinX / xSCALE, -DYMaxX / xSCALE, xSCALE), tAxisV.tAxisCreate(Lpx / tSCALE, tSCALE), yAxisV.yAxisCreate(DYMinV / vSCALE, -DYMaxV / vSCALE, vSCALE), xaPlot.graphics.clear().ss(2).s("#9999FF").moveTo(0, y01 * ε * xSCALE), xbPlot.graphics.clear().ss(2).s("#FF9999").moveTo(0, y02 * ε * xSCALE), vaPlot.graphics.clear().ss(2).s("#9999FF").moveTo(0, v01 * ε * vSCALE), vbPlot.graphics.clear().ss(2).s("#FF9999").moveTo(0, v02 * ε * vSCALE);
    for (var e, t, a = dtInitial, s = y01, n = v01, i = y02, r = v02, o = 0; o <= tEnd - a; o += a) {
        if (null == e) {
            var v = getPos(g, m1, λ * Math.pow(m1, 1 / 3), s, n, o, a);
            s = v.y, n = v.v, null == v.t ? (xaPlot.graphics.lineTo((o + a) * tSCALE, s * ε * xSCALE), vaPlot.graphics.lineTo((o + a) * tSCALE, n * ε * vSCALE)) : (xaPlot.graphics.lineTo(v.t * tSCALE, s * ε * xSCALE), vaPlot.graphics.lineTo(v.t * tSCALE, n * ε * vSCALE)), e = v.t
        }
        if (null == t && !oneBody) {
            var l = getPos(g, m2, λ * Math.pow(m2, 1 / 3), i, r, o, a);
            i = l.y, r = l.v, null == l.t ? (xbPlot.graphics.lineTo((o + a) * tSCALE, i * ε * xSCALE), vbPlot.graphics.lineTo((o + a) * tSCALE, r * ε * vSCALE)) : (xbPlot.graphics.lineTo(l.t * tSCALE, i * ε * xSCALE), vbPlot.graphics.lineTo(l.t * tSCALE, r * ε * vSCALE)), t = l.t
        }
    }
}

function getPos(e, t, a, s, n, i, r) {
    var o = new Object,
        v = !1;
    do {
        var l = RungeKutta(e, t, a, s, n, i, r);
        if (l.y <= yMin) {
            var x;
            if (o.stopFlag = !0, x = Math.abs(yMin - s) <= 1e-5) {
                v = !1, o.t = i;
                break
            }
            v = !0, r /= 2
        } else i += r, s = l.y, n = l.v, o.stopFlag = !1
    } while (v && !x);
    return o.y = s, o.v = n, o
}
pointClones.visible = !1;