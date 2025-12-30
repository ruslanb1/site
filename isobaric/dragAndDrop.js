/*!
* © by Sitsanlis Ilias
* This notice shall be included in all copies or substantial portions of the Software.
* Creative Commons 4.0/CC BY - NC - SA 4.0. 
*/


function mouseDownGen(a){a.target.offset={x:a.target.x-720/canvas.width*a.stageX,y:a.target.y-420/canvas.height*a.stageY};a.target.addEventListener("pressmove",pressMoveGen)}
function pressMoveGen(a){var d=canvas.width,c=canvas.height,b=720/d*a.stageX+a.target.offset.x,e=420/c*a.stageY+a.target.offset.y;if("topBox"==a.target.name)V=(bottomY-e)/VScale,V>Vmax&&(V=Vmax),V<Vmin&&(V=Vmin),T=100*p*V/n,arrangeLimits(),putPointInLimits(),setSlidersAndSpinersValues(),drawBox(),updateThePointPos(),drawArray();else if("pvPoint"==a.target.name){if(0==graphIndex)V=(b-XpV)/VSCALE,T=100*p*V/n;else if(1==graphIndex||2==graphIndex)T=(b-XpV)/TSCALE,V=n*T/100/p;putPointInLimits();setSlidersAndSpinersValues();
drawBox();updateThePointPos()}else"mainPlot"==a.target.name&&(b=plotsText.getChildAt(plotsText.numChildren-1),plotsText.removeChild(b),mainPlot.graphics.clear(),0==graphIndex||1==graphIndex?(p=(420/c*a.stageY-YpV)/pSCALE,p<pmin&&(p=pmin),p>pmax&&(p=pmax)):(a=(720/d*a.stageX-XpV)/TSCALE*n/100/((420/c*a.stageY-YpV)/pSCALE),a<pmin&&(a=pmin),a>pmax&&(a=pmax),p=a),T=100*p*V/n,arrangeLimits(),putPointInLimits(),setSlidersAndSpinersValues(),$("#pSlider").slider({value:p.toFixed(1)}),$("#pSpinner").spinner().val(p.toFixed(1)),
drawBox(),updateThePointPos(),drawArray());restart()}
function pressUpGen(a){if("topBox"==a.target.name)V=round(V,1),T=100*p*V/n,arrangeLimits(),putPointInLimits(),setSlidersAndSpinersValues(),drawBox(),updateThePointPos(),drawArray();else if("pvPoint"==a.target.name){if(0==graphIndex)V=round(V,1),T=100*p*V/n;else if(1==graphIndex||2==graphIndex)T=Math.round(T/sT)*sT,V=n*T/100/p;putPointInLimits();setSlidersAndSpinersValues();drawBox();updateThePointPos()}else"mainPlot"==a.target.name&&(p=round(p,1),p<pmin&&(p=pmin),p>pmax&&(p=pmax),T=100*p*V/n,arrangeLimits(),
putPointInLimits(),setSlidersAndSpinersValues(),$("#pSlider").slider({value:p.toFixed(1)}),$("#pSpinner").spinner().val(p.toFixed(1)),drawBox(),updateThePointPos(),drawArray());restart();a.target.removeEventListener("pressmove",pressMoveGen)};