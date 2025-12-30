

helpText.text =
    "Приложение, с помощью которого мы можем изучить понятие траектории и разницу между понятиями  перемещение и длина пути. Вы можете перетаскивать желтые и черные точки, чтобы увидеть траекторию и построить график смещения точки. Нажатие кнопки воспроизведения повторяет траекторию и строит график смещения тела.";

var canvas,
    stage,
    self,
    controlBoxContainer,
    marginVarNumber = 129,
    marginVar = marginVarNumber,
    PI = Math.PI,
    toDeg = 180 / PI,
    toRad = PI / 180,
    moires = String.fromCharCode(186),
    X0 = 360,
    Y0 = 200,
    t = 0,
    dt = 1 / 60,
    dtInitial = dt,
    dtSlow = dt,
    factor = 0.5,
    playMovie = !1,
    framePlay = !1,
    xScale = 40,
    yScale = -xScale,
    vScale = 7.5,
    scaleF = 1.25,
    vectorScale = 1,
    valuesText = new createjs.Text("", "12px Trebuchet MS");
valuesText.set({ x: 360, y: 375 }), valuesText.set({ textAlign: "center" });
var x,
    y,
    vx,
    vy,
    index,
    startIndex,
    forceIsAct,
    _xmouse,
    _ymouse,
    sText = "",
    X = 360,
    Y = 200,
    SMALL_MASS = 0.1,
    MEDIUM_MASS = 1,
    LARGE_MASS = 25,
    MEDIUM_b = 3,
    LARGE_b = 5,
    m = SMALL_MASS,
    b = MEDIUM_b,
    g = 10,
    showMovie = !1,
    xPos = new Array(),
    yPos = new Array(),
    vxPos = new Array(),
    vyPos = new Array(),
    VSCALE = 50,
    dr = 0,
    drFinal = 0,
    Δs = 0,
    grid = new createjs.Shape(),
    arc_mc = new createjs.Shape(),
    drText = ΔrTextShape(),
    θText = θTextShape(),
    graphX_mc = new createjs.Shape(),
    point_mc = makeDragPoint("#FFFF99", "point_mc", 3);
point_mc.addEventListener("mousedown", mouseDownGen), point_mc.addEventListener("pressup", pressUpGen), (point_mc.mouseChildren = !1);
var drVec = createVector("#FF0000", !0, !0);
drVec.addEventListener("mousedown", mouseDownVector), drVec.addEventListener("pressup", pressUpVector), (drVec.mouseChildren = !1);
var ruler = new createjs.Container();
ruler.set({ x: 360, y: 60, alpha: 0.75, visible: !1, regX: (10 * xScale) / 2, regY: 12.5 }), (ruler.name = "ruler"), ruler.addEventListener("mousedown", mouseDownRuler), ruler.addEventListener("pressup", pressUpRuler);
var xAxis = new createjs.Container();
xAxis.set({ x: X0, y: Y0, visible: !1, name: "xAxis" });
var yAxis = new createjs.Container();
yAxis.set({ x: X0, y: Y0, visible: !1, name: "yAxis" });
var dotlines = new createjs.Shape();
function init() {
    (stage = new createjs.Stage(document.getElementById("demoCanvas"))),
        createjs.Touch.enable(stage),
        stage.enableMouseOver(),
        stage.enableDOMEvents(!0),
        (canvas = document.getElementById("demoCanvas")),
        (self = stage),
        (controlBoxContainer = new createjs.Container()),
        self.addChild(controlBoxContainer);
    var e = new createjs.DOMElement("foo");
    controlBoxContainer.addChild(e),
        (controlBoxContainer.x = 2.5),
        (controlBoxContainer.y = 2.5),
        stage.addChild(xAxis),
        stage.addChild(yAxis),
        stage.addChild(grid),
        stage.addChild(dotlines),
        stage.addChild(arc_mc),
        stage.addChild(drText),
        stage.addChild(graphX_mc),
        stage.addChild(θText),
        stage.addChild(drVec),
        stage.addChild(point_mc),
        stage.addChild(valuesText),
        stage.addChild(ruler),
        createRegister(),
        stage.addChild(Ψ),
        addFunction(),
        (pos = 2),
        showHideVariables(),
        handleComplete(),
        (stage.getChildByName("variablesSymbolTxt").visible = !1),
        (variablesSh.visible = !1),
        initialize(),
        (createjs.Ticker.timingMode = createjs.Ticker.RAF),
        createjs.Ticker.addEventListener("tick", tick),
        (canvas.style.visibility = "visible"),
        (document.getElementById("variables").style.visibility = "visible");
}
function initialize() {
    createGrid(0, 0, 720, 400, 8, 8, 40, 40),
        drawRuler(12, xScale),
        xAxis.xMainAxisCreate(-X0 / xScale + 1, (710 - X0) / xScale, xScale),
        yAxis.yMainAxisCreate((360 - Y0) / yScale, -Y0 / yScale, yScale),
        (y = x = 0),
        (X = X0),
        (Y = Y0),
        (point_mc.x = X),
        (point_mc.y = Y),
        (stageUpdateFlag = forceIsAct = playMovie = !1),
        restart();
}
function restart() {
    isOk || stage.removeAllChildren(),
        (showMovie = !1),
        (Δs = drFinal = dr = 0),
        (sText = ""),
        (valuesText.text = sText),
        arc_mc.graphics.clear(),
        (θText.visible = !1),
        (vy = vx = t = index = startIndex = 0),
        (x = (point_mc.x - X0) / xScale),
        (y = (point_mc.y - Y0) / yScale),
        (yPos = []),
        (vxPos = []),
        (vyPos = []),
        (xPos = []).push(x),
        yPos.push(y),
        vxPos.push(vx),
        vyPos.push(vy),
        (X = X0 + x * xScale),
        (Y = Y0 + y * yScale),
        (drVec.x = X),
        (drVec.y = Y),
        drVec.setScaleX(0),
        updateTextVector(drText, drVec, 17, 0),
        clearGraph(),
        positions();
}
function tick(e) {
    var a, s, r;
    stageUpdateFlag && stage.update(),
        playMovie
            ? (RungeKutta(),
              (t += dt),
              xPos.push(x),
              yPos.push(y),
              vxPos.push(vx),
              vyPos.push(vy),
              (a = xPos[xPos.length - 1] - xPos[xPos.length - 2]),
              (s = yPos[yPos.length - 1] - yPos[xPos.length - 2]),
              (r = Math.sqrt(a * a + s * s)),
              (Δs += r),
              positions())
            : 1 == showMovie && (index <= xPos.length - 1 ? ((x = xPos[index]), (y = yPos[index]), positions(), index++) : ((stageUpdateFlag = !0), (showMovie = !1), drVec.addEventListener("tick", myTween)));
}
function positions() {
    (X = X0 + x * xScale),
        (Y = Y0 + y * yScale),
        (point_mc.x = X),
        (point_mc.y = Y),
        playMovie && (graphX_mc.graphics.lt(X, Y), (sText = "Длина пути = " + Δs.toFixed(1) + " м"), (valuesText.text = sText)),
        dotlines.graphics.clear().ss(1).s("#000").sd([2, 2]).mt(X, Y0).lt(X, Y).lt(X0, Y),
        stage.update();
}
function createGrid(e, t, a, s, r, i, o, n) {
    var d = grid.graphics;
    d.setStrokeStyle(0.2), d.beginStroke("#DDDDDD");
    for (var l = 0; l <= a; l += r) d.moveTo(e + l, t), d.lineTo(e + l, t + s);
    for (var c = 0; c <= s; c += i) d.moveTo(e, t + c), d.lineTo(e + a, t + c);
    d.endStroke(), d.setStrokeStyle(0.3), d.beginStroke("#BBBBBB");
    for (l = 0; l <= a; l += o) d.moveTo(e + l, t), d.lineTo(e + l, t + s);
    for (c = 0; c <= s; c += n) d.moveTo(e, t + c), d.lineTo(e + a, t + c);
    d.endStroke();
}
function playRecord() {
    null != (index = startIndex) && ((showMovie = !(playMovie = !1)), (x = xPos[index]), (y = yPos[index]), (X = X0 + x * xScale), (Y = Y0 + y * yScale), graphX_mc.graphics.moveTo(X, Y), positions());
}
dotlines.visible = !1;
