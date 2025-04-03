


function motoManShape() {
	var shape = new createjs.Shape();
	shape.graphics.f("#4A4545").s().p("Ah9BaIhEBqIgSgLIBEhpQgjgQg4AEQgRgVARgRIBgAAIAigyIA+AyIBoAAQAJABAEAUQAjgIASggIhhhOIg/BaIhDgxIBFhbQAZgPAfAMIByBXIAAgTIBQAhQAlAlgXAzQghgBgZALIA9BrIgSAKIg+hqQgnAcgPBDQgbAbggACIiCADQALhbgygkgAAvhxQgigjgrAUQgWghAZgkQAZgcAoAMQAaAIALAkIgpgFIAAAcIApAGIAAAgg").f("#000").dc(0,28,2.5);
	
	
	
	return shape
}

function vTextShape() {
	var shape = new createjs.Shape();
	shape.graphics.f("#000000").s().p("AgXAkQgGgGgBgIQAAgFADgMIAIgZIABgHQAAgBAAAAQAAgBAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgBABAAAAIgIAJIgDgCQAMgTAMAAQAJAAgBAIQABAEgDAIIgJAfQgDAIAAAFQAAAHAEADQADADAFAAQAKAAAKgPQAKgQAAgSQAAgWgPgCIAAgEQAaAFAAAaQAAARgNAQQgLARgSAAQgLAAgGgFg");
	
	
	
	return shape
}

function aTextShape() {
	var shape = new createjs.Shape();
	shape.graphics.f("#000000").s().p("AAYAlQgDgDgCgVQgQAcgTAAQgMAAgHgIQgGgIAAgNQAAgMAGgMQAGgMAKgIQAKgIAKAAQAIAAAFAFQAFAFACALIAIgTIANAAIgTAqQABAYAIAAQACAAACgCQACgDABgEIADAAQgCAWgKAAQgDAAgDgEgAgRgPQgLATAAAPQAAAIAEAFQADAFAGAAQAHAAAFgHQAEgGAJgVIAHgPQAAgHgEgIQgDgIgHAAQgKAAgKAUg");
	
	return shape
}



function wheelShape() {
	var shape = new createjs.Shape();
	
	shape.graphics.s("#0099FF").ss(3.5).dc(0,0,8).s("#666666").ss(2).mt(0,8-1.75).lt(0,8+1.75)
	return shape;
}


function aGraphTextShape() {
    var text = new createjs.Text("a (м/с²)", "italic 16px 'STIX Two Math'", "#000000");
    text.regX = -10;
    text.outline = 0;
    text.outlineColor = "#FFFFFF";
    text.scaleX = text.scaleY = 0.9;
    return text;
    
}

function vGraphTextShape() {
	var text = new createjs.Text(" υ (м/с)", "italic 16px 'STIX Two Math'", "#000000");
    /*text.shadow = new createjs.Shadow("#000000", 2, 2, 1);*/
    text.outline = 0;
    text.outlineColor = "#FFFFFF";
    text.scaleX = text.scaleY = 0.9;
    return text;
}

function xGraphTextShape() {
	var text = new createjs.Text("  y (м)", "italic 16px 'STIX Two Math'", "#000000");
    /*text.shadow = new createjs.Shadow("#000000", 2, 2, 1);*/
    text.outline = 0;
    text.outlineColor = "#FFFFFF";
    text.scaleX = text.scaleY = 0.9;
    return text;
}
function tGraphTextShape() {
	var text = new createjs.Text("t(c)", "italic 16px 'STIX Two Math'", "#000000");
    
    text.regX = 20;
    // Стилевые настройки (как в оригинале)
    text.outline = 0;
    text.outlineColor = "#FFFFFF";
    text.scaleX = text.scaleY = 0.9;
    
    return text;
}