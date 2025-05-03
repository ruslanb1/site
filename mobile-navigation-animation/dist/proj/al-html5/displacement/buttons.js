/*!
* © by Sitsanlis Ilias
* This notice shall be included in all copies or substantial portions of the Software.
* Creative Commons 4.0/CC BY - NC - SA 4.0. 
*/
$(function(){$("#stop").button({text:!1,icons:{primary:"ui-icon-arrowrefresh-1-e"}}).click(function(){playMovie=!1,dt=dtSlow,restart(),$("#play").button("option",{label:"Έναρξη",icons:{primary:"ui-icon-play"}})}),$("#allTime").button({text:!1}).click(function(){flag=$(this).is(":checked")}),$("#infoIsVisible").button({text:!1}).click(function(){valuesText.visible=$(this).is(":checked"),stage.update()}),$("#position").button({text:!1}).click(function(){xVec.visible=xVecText.visible=$(this).is(":checked"),stage.update()})});