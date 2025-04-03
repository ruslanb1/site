﻿

function rnd(a,c){return Math.floor(Math.random()*(c-a+1))+a}function toExp(a){var c=a.toExponential(1),b=c.indexOf("e");a=c.substr(0,b);var d=c.substr(b+2),e="";c=c.substr(b+1,1);for(b=0;b<=d.length-1;b++){var f=d.substr(b,1);if("0"==f)return a;e="1"==f?e+"\u00b9":"2"==f?e+"\u00b2":"3"==f?e+"\u00b3":e+String.fromCharCode("0x207"+f)}return a+"\u00b710"+("-"==c?"\u207b":"")+e}function sngNumber(a){return 0>=a?a.toString():"+"+a.toString()}
function makeDragLine(a,c,b){void 0==a&&(a="#000000");void 0==c&&(c="dragPoint");void 0==b&&(b=100);var d=new createjs.Shape,e=d.graphics;e.setStrokeStyle(2);e.beginStroke(a);e.mt(0,0).lt(0,b);e.endStroke();e.endFill();d.hitArea=new createjs.Shape;d.hitArea.graphics.setStrokeStyle(2);d.hitArea.graphics.beginStroke("#FFFFFF");d.hitArea.graphics.beginFill("#FFFFFF");d.hitArea.graphics.dr(-20,0,40,b);d.hitArea.graphics.endFill();d.hitArea.graphics.endStroke();d.hitArea.alpha=.1;d.name=c;return d}
function makeDragPoint(a,c,b){void 0==a&&(a="#000000");void 0==c&&(c="dragPoint");void 0==b&&(b=5);var d=new createjs.Shape,e=d.graphics;e.setStrokeStyle(1);e.beginStroke("#000000");e.beginFill(a);e.dc(0,0,b);e.endStroke();e.endFill();d.hitArea=new createjs.Shape;d.hitArea.graphics.beginStroke("#FFFFFF");d.hitArea.graphics.beginFill("#FFFFFF");d.hitArea.graphics.dc(0,0,15);d.hitArea.graphics.endStroke();d.hitArea.alpha=.01;d.name=c;return d}
function makePoint(a,c,b){void 0==a&&(a="#000000");void 0==c&&(c="dragPoint");void 0==b&&(b=5);var d=new createjs.Shape,e=d.graphics;e.setStrokeStyle(1);e.beginStroke(a);e.beginFill(a);e.dc(0,0,b);e.endStroke();e.endFill();d.name=c;return d}function makeGraphPoint(){var a=new createjs.Shape,c=a.graphics;c.setStrokeStyle(1);c.beginStroke("#000");c.beginFill("#fff");c.dc(0,0,2.5);c.endStroke();c.endFill();return a}
function createVector(a,c,b){void 0==a&&(a="#000000");void 0==c&&(c=!1);void 0==b&&(b=!1);var d=new createjs.Container;new createjs.Shape;var e=createLineVector(a);d.addChild(e);new createjs.Shape;e=createArrowVector(a);d.addChild(e);c&&(new createjs.Shape,c=createDragLineVector(),d.addChild(c));b&&(new createjs.Shape,a=createCircleVector(a),d.addChild(a));return d}
function createLineVector(a){void 0==a&&(a="#000000");var c=new createjs.Shape,b=c.graphics;b.setStrokeStyle(2.5);b.beginStroke(a);b.moveTo(0,0);b.lineTo(100,0);b.endStroke();return c}function createDragLineVector(){var a=new createjs.Shape,c=a.graphics;c.setStrokeStyle(25);c.beginStroke("#ffffff");c.moveTo(0,0);c.lineTo(100,0);c.endStroke();a.alpha=.01;a.name="dragLine";return a}
function createCircleVector(a){a=new createjs.Shape;var c=a.graphics;c.beginFill("#000000");c.dc(0,0,3);a.name="startVector";return a}function createArrowVector(a){void 0==a&&(a="#000000");var c=new createjs.Shape,b=c.graphics;b.setStrokeStyle(1.5,"round","round");b.beginStroke(a);b.beginFill(a);b.moveTo(0,0);b.lineTo(8*Math.cos(155*toRad),-8*Math.sin(155*toRad));b.lineTo(-5.5,0);b.lineTo(8*Math.cos(205*toRad),-8*Math.sin(205*toRad));b.closePath();b.endFill();b.endStroke();return c}
createjs.Container.prototype.setScaleX=function(a){var c=this.getChildAt(0),b=this.getChildAt(1),d=this.getChildByName("dragLine");this.getChildByName("startVector");b.x=a;var e=0>a?-1:1;25<=Math.abs(a)?(b.scaleX=e,c.scaleX=(a-e)/100,null!=d&&(d.scaleX=(a-e)/100)):(b.scaleX=4*a/100,c.scaleX=a/100-4*a/100/100,null!=d&&(d.scaleX=a/100-4*a/100/100))};
function updateTextVector(a,c,b,d){var e=c.rotation;arrowVec=c.getChildAt(1);var f=arrowVec.x;0>f&&(f=Math.abs(f),e+=180);f=Math.abs(f);var g=c.y+f*Math.sin(e*toRad)+b*Math.sin(e*toRad)+d*Math.sin((e+90)*toRad);a.x=c.x+f*Math.cos(e*toRad)+b*Math.cos(e*toRad)+d*Math.cos((e+90)*toRad);a.y=g;a.textBaseline="alphabetic";a.textAlign="center";a.alpha=5>Math.abs(f)?0:1}
function mouseDownVector(a){a.target.offset={x:a.target.x-720/canvas.width*a.stageX,y:a.target.y-420/canvas.height*a.stageY};a.target.addEventListener("pressmove",pressMoveVector)}function pressMoveVector(a){var c=canvas.width;"vVec"==a.target.name&&(v0=Number(((720/c*a.stageX-a.target.x)/vScale).toFixed(1)),x0=x);updateSlidersAndSpinners();restart();stage.update()}
function pressUpVector(a){a.target.removeEventListener("pressmove",pressMoveVector);a=.2*yAxisV.step;v0=Math.round(v0/a)*a;updateSlidersAndSpinners();restart()}
createjs.Shape.prototype.drawDistance=function(a,c,b,d,e,f){void 0==a&&(a="#000000");var g=this.graphics;g.clear();var h=Math.sqrt((d-c)*(d-c)+(e-b)*(e-b));d=Math.atan2(-(e-b),d-c);2<h&&(e=8*(25<h?1:4*h/100),g.setStrokeStyle(1,"round","round"),g.beginStroke(a),g.mt(e*Math.cos(25*toRad),-e*Math.sin(25*toRad)).lt(0,0).lt(e*Math.cos(25*toRad),+e*Math.sin(25*toRad)),g.mt(0,0).lt(h,0).lt(h+e*Math.cos(155*toRad),-e*Math.sin(155*toRad)).mt(h,0).lt(h+e*Math.cos(205*toRad),-e*Math.sin(205*toRad)),g.setStrokeStyle(1),
g.setStrokeDash([2,2],2),g.beginStroke(a),g.mt(0,f/2).lt(0,-f/2),g.mt(h,f/2).lt(h,-f/2),g.endStroke(),g.beginFill("#FFFFFF"),g.dr(h/2-20,-6,40,12),this.rotation=-d*toDeg,this.regX=f*Math.cos(Math.PI/2),this.regY=-f*Math.sin(Math.PI/2),this.x=c,this.y=b)};function fixPeriod(a,c){return a-c*Math.floor(a/c)}var shifted=!1;$(document).on("keyup keydown",function(a){shifted=a.shiftKey});
createjs.Container.prototype.slider=function(a){function c(b){var c=720/canvas.width*b.stageX+b.target.offset.x;0>c&&(c=0);c>a&&(c=a);b.target.x=c;dt=dtSlow=Math.round(10*Math.pow(10,c/(a/2)-1))/10*dtInitial;stage.update()}var b=new createjs.Shape,d=b.graphics;this.addChild(b);d.setStrokeStyle(1);d.beginStroke("#aaa");for(var e=a/10,f=0;10>=f;f++)d.mt(f*e,-2).lt(f*e,-6);d.beginFill("#eee");d.r(0,-2,a,4);d.endFill();b.hitArea=new createjs.Shape;b.hitArea.graphics.beginStroke("#FFFFFF");b.hitArea.graphics.beginFill("#FFFFFF");
b.hitArea.graphics.r(0,-10,a,20);b.hitArea.graphics.endStroke();b.hitArea.alpha=.01;b=new createjs.Shape;this.addChild(b);d=b.graphics;d.setStrokeStyle(1);d.beginStroke("#aaa");d.beginFill("#eee");d.r(-6,-6,12,12);b.hitArea=new createjs.Shape;b.hitArea.graphics.beginStroke("#FFFFFF");b.hitArea.graphics.beginFill("#FFFFFF");b.hitArea.graphics.dc(0,0,20);b.hitArea.graphics.endStroke();b.hitArea.alpha=.01;d=new createjs.Text("","10px Trebuchet MS","#666666");d.set({textAlign:"center"});d.x=a/2;d.y=-20;
this.addChild(d);b.on("mousedown",function(a){a.target.offset={x:a.target.x-720/canvas.width*a.stageX,y:a.target.y-420/canvas.height*a.stageY};a.target.addEventListener("pressmove",c)})};createjs.Shape.prototype.addArrow=function(a,c,b,d){var e=this.graphics;e.ss(1);e.s(a);e.mt(c,b).lt(c+7*Math.cos((152.5+d)*toRad),b-7*Math.sin((152.5+d)*toRad)).mt(c,b).lt(c+7*Math.cos((207.5+d)*toRad),b-7*Math.sin((207.5+d)*toRad))};