function MaxwellBoltzmann(b, a) {
    var d = Math.PI;
    return 4 * Nmax * d * Math.pow(6.64E-27 / (2.7613008E-23 * d * a), 1.5) * b * b * Math.exp(-6.64E-27 * b * b / (2.7613008E-23 * a))
}

function createParticle(b, a) {
    var d = particles.numChildren,
        f = 0;
    for (Vel = N = 0; Vel <= Velmax;) {
        Vel += dVel;
        var g = dVel * MaxwellBoltzmann(Vel, b);
        for (j = 1; j <= g; j++) {
            f++;
            if (f <= d) {
                var c = particles.getChildAt(f - 1),
                    e = c.y;
                if (e < Ymin || e > Ymax) c.y = rnd(Ymin, Ymax);
                e = Math.atan2(c.Vely, c.Velx);
                c.Velx = Vel * Math.cos(e);
                c.Vely = Vel * Math.sin(e)
            } else c = makePoint("#999", Radii), c.x = rnd(Xmin, Xmax), c.y = rnd(Ymin, Ymax), e = rnd(0, 360) * toRad, c.Velx = Vel * Math.cos(e), c.Vely = Vel * Math.sin(e), c.collited = !1, particles.addChild(c);
            Vrms2 += Vel * Vel
        }
    }
    for (N =
        f; particles.numChildren > Nmax;) particles.removeChildAt(particles.numChildren - 1);
    Vrms = Math.sqrt(Vrms2 / N)
}

function arrangeLimits() {
    if (0 == graphIndex) Vmin = Math.max(iVmin, n * iTmin / 100 / p), Vmax = Math.min(iVmax, n * iTmax / 100 / p), Tmin = Math.round(Math.max(iTmin, 100 * p * iVmin / n) / sT) * sT, Tmax = Math.round(Math.min(iTmax, 100 * p * iVmax / n) / sT) * sT;
    else if (1 == graphIndex || 2 == graphIndex) Vmin = Math.max(iVmin, n * iTmin / 100 / p), Vmax = Math.min(iVmax, n * iTmax / 100 / p), Tmin = Math.round(Math.max(iTmin, 100 * p * iVmin / n) / sT) * sT, Tmax = Math.round(Math.min(iTmax, 100 * p * iVmax / n) / sT) * sT;
    $("#TSlider").slider("option", "max", Tmax);
    $("#TSpinner").spinner("option",
        "max", Math.round(Tmax / sT) * sT);
    $("#VSlider").slider("option", "max", Vmax);
    $("#VSpinner").spinner("option", "max", round(Vmax, 1));
    $("#TSlider").slider("option", "min", Tmin);
    $("#TSpinner").spinner("option", "min", Math.round(Tmin / sT) * sT);
    $("#VSlider").slider("option", "min", Vmin);
    $("#VSpinner").spinner("option", "min", round(Vmin, 1))
}

function putPointInLimits() {
    T < Tmin ? (T = Tmin, V = n * T / (100 * p)) : T > Tmax && (T = Tmax, V = n * Tmax / (100 * p));
    V < Vmin ? (V = Vmin, T = p * V * 100 / n) : V > Vmax && (V = Vmax, T = p * V * 100 / n)
}

function setSlidersAndSpinersValues() {
    $("#VSpinner").spinner().val(round(V, 1));
    $("#VSlider").slider({
        value: round(V, 1)
    });
    $("#TSpinner").spinner().val(Math.round(T / sT) * sT);
    $("#TSlider").slider({
        value: Math.round(T / sT) * sT
    })
}

function updateThePointPos() {
    0 == graphIndex ? (point.x = XpV + V * VSCALE, point.y = YpV + p * pSCALE) : 1 == graphIndex ? (point.x = XpV + T * TSCALE, point.y = YpV + p * pSCALE) : 2 == graphIndex && (point.x = XpV + T * TSCALE, point.y = YpV + V * pSCALE);
    indicator.rotation = 18 * p - 90;
    pressureText.text = p.toFixed(1) + " атм";
    temperatureText.text = "T = " + (Math.round(T / sT) * sT).toFixed(0) + " K";
    drawWeights(p)
}

function drawAllAxis() {
    0 == graphIndex ? (VEnd = Lpx / VSCALE, xAxispV.tAxisCreate(Lpx / VSCALE, VSCALE), yAxispV.yAxisCreate(DYMinpV / pSCALE, -DYMaxpV / pSCALE, pSCALE), point.set({
        x: XpV + V * VSCALE,
        y: YpV + p * pSCALE
    }), VGraphTextShape(xGraphText), pGraphTextShape(yGraphText), xGraphText.set({
        x: XpV + Lpx + 40,
        y: YpV
    }), yGraphText.set({
        x: XpV,
        y: YpV - 2 * Hpx - 30
    })) : 1 == graphIndex ? (xAxispV.tAxisCreate(Lpx / TSCALE, TSCALE), yAxispV.yAxisCreate(DYMinpV / pSCALE, -DYMaxpV / pSCALE, pSCALE), point.set({
            x: XpV + T * TSCALE,
            y: YpV + p * pSCALE
        }), TGraphTextShape(xGraphText),
        pGraphTextShape(yGraphText), xGraphText.set({
            x: XpV + Lpx + 40,
            y: YpV
        }), yGraphText.set({
            x: XpV,
            y: YpV - 2 * Hpx - 30
        })) : 2 == graphIndex && (xAxispV.tAxisCreate(Lpx / TSCALE, TSCALE), yAxispV.yAxisCreate(DYMinpV / pSCALE, -DYMaxpV / pSCALE, pSCALE), point.set({
        x: XpV + T * TSCALE,
        y: YpV + V * pSCALE
    }), TGraphTextShape(xGraphText), VGraphTextShape(yGraphText), xGraphText.set({
        x: XpV + Lpx + 40,
        y: YpV
    }), yGraphText.set({
        x: XpV,
        y: YpV - 2 * Hpx - 30
    }))
}

function drawBox() {
    topY = bottomY - V * VScale;
    Ymin = topY + Radii;
    topBox.y = topY;
    createParticle(T, 0);
    temperatureText.y = topY - 15;
    valuesText.y = (topY + bottomY) / 2
}

function drawPlot(b, a, d) {
    updateAllPoints();
    var f = Math.max(iVmin, n * iTmin / 100 / a),
        g = Math.min(iVmax, n * iTmax / 100 / a),
        c = Math.max(100 * iVmin * a / n, iTmin),
        e = Math.min(100 * iVmax * a / n, iTmax);
    0 == graphIndex ? (b.graphics.ss(2).s(d).mt(XpV + f * VSCALE, YpV + a * pSCALE).lt(XpV + g * VSCALE, YpV + a * pSCALE), b.addArrow2(d, XpV + (f + g) / 2 * VSCALE, YpV + a * pSCALE, 0 < \u03bb ? 0 : 180), b = new createjs.Text(a.toFixed(1) + " атм", "9px Trebuchet MS", "#333"), b.set({
            x: XpV + iVmax * VSCALE + 5,
            y: YpV + a * pSCALE - 4.5,
            textAlign: "left"
        }), plotsText.addChild(b)) : 1 == graphIndex &&
        T <= iTmax ? (b.graphics.ss(2).s(d).mt(XpV + c * TSCALE, YpV + a * pSCALE).lt(XpV + e * TSCALE, YpV + a * pSCALE), b.addArrow2(d, XpV + (c + e) / 2 * TSCALE, YpV + a * pSCALE, 0 < \u03bb ? 0 : 180), b = new createjs.Text(a.toFixed(1) + " атм", "9px Trebuchet MS", "#333"), b.set({
            x: XpV + iVmax * VSCALE + 5,
            y: YpV + a * pSCALE - 4.5,
            textAlign: "left"
        }), plotsText.addChild(b)) : 2 == graphIndex && T <= iTmax && (b.graphics.ss(2).s(d).sd([0, 0]).mt(XpV + c * TSCALE, YpV + f * pSCALE).lt(XpV + e * TSCALE, YpV + g * pSCALE).sd([3, 3]).mt(XpV, YpV).lt(XpV + c * TSCALE, YpV + f * pSCALE).sd([0, 0]), b.addArrow2(d,
            XpV + (c + e) * TSCALE / 2, YpV + (f + g) * pSCALE / 2, (0 < \u03bb ? 0 : 180) + toDeg * Math.atan2(-(g - f) * pSCALE, (e - c) * TSCALE)), b = new createjs.Text(a.toFixed(1) + " атм", "9px Trebuchet MS", "#333"), b.set({
            x: XpV + e * TSCALE + (.5 >= 10 - g ? 2 : 22),
            y: YpV + g * pSCALE + (.5 >= 10 - g ? -12 : -4.5),
            textAlign: "center"
        }), plotsText.addChild(b))
}

function drawArea() {
    area.graphics.clear().f("#ff9900").dr(XpV + Vs * VSCALE, YpV + ps * pSCALE, (V - Vs) * VSCALE, p * VSCALE);
    area.graphics.ss(1).s("#000").sd([2, 2]).mt(XpV + Vs * VSCALE, YpV).lt(XpV + Vs * VSCALE, YpV + ps * pSCALE).mt(XpV + V * VSCALE, YpV).lt(XpV + V * VSCALE, YpV + p * pSCALE)
}

function drawArray() {
    plotsText.removeAllChildren();
    plots.graphics.clear();
    mainPlot.graphics.clear();
    mainPlot.hitArea = new createjs.Shape;
    mainPlot.hitArea.graphics.f("#FFFFFF");
    0 == graphIndex ? mainPlot.hitArea.graphics.dr(XpV + Vmin * VSCALE, YpV + p * pSCALE - 10, (Vmax - Vmin) * VSCALE, 20) : 1 == graphIndex ? mainPlot.hitArea.graphics.dr(XpV + Tmin * TSCALE, YpV + p * pSCALE - 10, (Tmax - Tmin) * TSCALE, 20) : (mainPlot.hitArea.graphics.ss(20).s("#000"), mainPlot.hitArea.graphics.mt(XpV + Tmin * TSCALE, YpV + Vmin * pSCALE).lt(XpV + Tmax * TSCALE, YpV + Vmax *
        pSCALE));
    for (var b = 0; b <= arrayOfPressure.length - 1; b++) drawPlot(plots, arrayOfPressure[b], "#1E90FF");
    drawPlot(mainPlot, p, "#0000CD")
}

function drawHotSource() {
    hotSource.graphics.clear();
    var b = 0 > \u03bb && playMovie ? "#6495ED" : 0 < \u03bb && playMovie ? "#F08080" : "#FFF";
    hotSource.graphics.ss(1).s("#666").f(b).drawRoundRect(XL - 30, bottomY + 20, W + 60, 20, 5)
}

function createGalvanometer() {
    var b = new createjs.Shape,
        a = b.graphics;
    a.clear().ss(1).s("#666").f("#fff").rc(-30, -31, 60, 35, 2, 2, 2, 2).dr(-40, -25, 10, 20);
    indicator.graphics.clear().ss(1).s("#000000").f("#000").mt(0, 0).lt(-.75, 0).lt(0, -20).lt(.75, 0).cp();
    for (var d = 0; d <= Math.PI; d += 18 * toRad) a.mt(20 * Math.cos(d), -20 * Math.sin(d)).lt(25 * Math.cos(d), -25 * Math.sin(d));
    a = new createjs.Text("Манометр", "9px Trebuchet MS", "#333");
    a.set({
        x: 0,
        y: 7.5,
        textAlign: "center"
    });
    galvanometer.addChild(b);
    galvanometer.addChild(indicator);
    galvanometer.addChild(a)
}

function drawWeights(b) {
    b = Math.ceil(b);
    weights.graphics.clear().ss(1).s("#666").f("#FF9933");
    for (var a = 1; a <= b; a++) weights.graphics.dr(-20, 4 * -a, 40, 4);
    weights.y = topY - 20
}

function updateAllPoints() {
    var b = points.numChildren;
    for (i = 0; i <= b - 1; i++) {
        var a = points.getChildAt(i);
        0 == graphIndex ? (a.x = XpV + a.V * VSCALE, a.y = YpV + a.p * pSCALE) : 1 == graphIndex ? (a.x = XpV + a.T * TSCALE, a.y = YpV + a.p * pSCALE) : 2 == graphIndex && (a.x = XpV + a.T * TSCALE, a.y = YpV + a.V * pSCALE)
    }
};