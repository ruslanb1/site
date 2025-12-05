/*!
* © by Sitsanlis Ilias
* This notice shall be included in all copies or substantial portions of the Software.
* Creative Commons 4.0/CC BY - NC - SA 4.0. 
*/


function mouseDownGen(a){a.target.offset={x:a.target.x-720/canvas.width*a.stageX,y:a.target.y-420/canvas.height*a.stageY};a.target.addEventListener("pressmove",pressMoveGen)}function pressMoveGen(a){var b=720/canvas.width*a.stageX+a.target.offset.x;"body1"==a.target.name?(x01=(b-X0)/xScale,x01+2*R>x02&&(x01=x02-2*R)):(x02=(b-X0)/xScale,x02-2*R<x01&&(x02=x01+2*R));restart()}function pressUpGen(a){a.target.removeEventListener("pressmove",pressMoveGen)};