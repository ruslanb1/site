/*!
* © by Sitsanlis Ilias
* This notice shall be included in all copies or substantial portions of the Software.
* Creative Commons 4.0/CC BY - NC - SA 4.0. 
*/


function mouseDownGen(a){var b=canvas.height;_xmouse=720/canvas.width*a.stageX;_ymouse=420/b*a.stageY;forceIsAct=playMovie=!0;clearGraph();a.target.addEventListener("pressmove",pressMoveGen)}function pressMoveGen(a){var b=canvas.height;_xmouse=720/canvas.width*a.stageX;_ymouse=420/b*a.stageY;0==playMovie&&1==forceIsAct&&positions()}function pressUpGen(a){forceIsAct=!1;a.target.removeEventListener("pressmove",pressMoveGen)};