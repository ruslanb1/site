﻿/*!
* © by Sitsanlis Ilias
* This notice shall be included in all copies or substantial portions of the Software.
*/

var isVisibleHelpText=!1,helpContainer=new createjs.Container,helpSh=new createjs.Shape,helpText=new createjs.Text;function createRegister(){helpSh.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),helpSh.set({x:20,y:380}),self.addChild(helpSh);var e=new createjs.Text("?","18px Trebuchet MS","#000000");e.set({x:20,y:371,textAlign:"center"}),self.addChild(e);var i=new createjs.Shape;i.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),i.set({x:700,y:380}),self.addChild(i);var s=new createjs.Text("<-","18px Trebuchet MS","#000000");s.set({x:700,y:371,textAlign:"center"}),self.addChild(s),helpSh.on("mousedown",helpClickFun),helpSh.on("pressup",helpPressUpFun),helpContainer.on("click",function(){helpContainer.removeAllChildren(),isVisibleHelpText=!isVisibleHelpText,helpSh.graphics.clear(),helpSh.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),stage.update()}),helpSh.addEventListener("mouseover",function(){helpSh.graphics.clear(),helpSh.graphics.s("#000000").ss(1.2).beginFill("#eeeeee").dc(0,0,12.5),stage.update()}),helpSh.addEventListener("mouseout",function(){helpSh.graphics.clear(),helpSh.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),stage.update()}),i.on("click",iClickFun),i.addEventListener("mouseover",function(){i.graphics.clear(),i.graphics.s("#000000").ss(1.2).beginFill("#eeeeee").dc(0,0,12.5),stage.update()}),i.addEventListener("mouseout",function(){i.graphics.clear(),i.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),stage.update()});var l=new createjs.Shape;l.graphics.s("#9C9898").ss(1.2).r(0,400,720,20),self.addChild(l),self.addChild(helpContainer)}function iClickFun(e){window.open("http://basantaev.ru/")}function helpClickFun(e){if(helpSh.graphics.clear(),helpSh.graphics.s("#003eff").ss(1.2).beginFill("#007fff").dc(0,0,12.5),isVisibleHelpText)helpContainer.removeAllChildren();else{helpText.set({textBaseline:"top",textAlign:"left",font:"12px Trebuchet MS",lineWidth:675,lineHeight:16,x:5,y:5});var i=helpText.getBounds().height+8,s=new createjs.Shape;s.graphics.s("#666666").ss(1).beginFill("#ffffcc").r(0,0,680,i),helpContainer.addChild(s,helpText),helpContainer.x=20,helpContainer.y=360-i,helpContainer.name="helpContainer"}isVisibleHelpText=!isVisibleHelpText,stage.update()}function helpPressUpFun(e){e.target.graphics.clear(),e.target.graphics.s("#000000").ss(1.2).beginFill("#ffffff").dc(0,0,12.5),stage.update()}