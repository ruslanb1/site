
function motoManShape() {
	var shape = new createjs.Shape();
	shape.graphics.f("#006699").s().p("Ah9BaIhEBqIgSgLIBEhpQgjgQg4AEQgRgVARgRIBgAAIAigyIA+AyIBoAAQAJABAEAUQAjgIASggIhhhOIg/BaIhDgxIBFhbQAZgPAfAMIByBXIAAgTIBQAhQAlAlgXAzQghgBgZALIA9BrIgSAKIg+hqQgnAcgPBDQgbAbggACIiCADQALhbgygkgAAvhxQgigjgrAUQgWghAZgkQAZgcAoAMQAaAIALAkIgpgFIAAAcIApAGIAAAgg");

	return shape
}

function wheelShape() {
	var shape = new createjs.Shape();
	
	shape.graphics.s("#0099FF").ss(3.5).dc(0,0,8).s("#666666").ss(2).mt(0,8-1.75).lt(0,8+1.75)
	return shape;
}

function carShape(color) {
	
	var res = new createjs.Container();
	
	var shape = new createjs.Shape();
	
	shape.graphics.f().s("#000000").ss(1,1,1).p("AAVgUQAOAcg4ANIgCgpg")//.f("#ffffff").s().p("AgXgUIAsAAQAOAcg4ANg");
	shape.setTransform(318.8,205.3);
	
	
	var shape_1 = new createjs.Shape();
	//shape_1.graphics.f("#ccc").r(-40,-5,80,20)//.r(-45,-15,90,30)
	shape_1.graphics.f(color).s("#000000").ss(1,1,1).p("AmLg1QCsgzC4gLQCsgFBABRQBrggCJBsQAAAkgfApIhOAAQAOgTAAgZQAAghgXgXQgXgWghAAQghAAgYAWQgXAXAAAhQAAAZAOAUInBABQANgVAAgZQAAghgYgXQgXgWghAAQghAAgXAWQgXAXAAAhQAAALADAMQgtgbgEh3g");
	shape_1.setTransform(360.5,208.6);
	
	var shape_2 = new createjs.Shape();
	shape_2.graphics.f("#ffffff").s("#000000").ss(1,1,1).p("AFdgaIgwAAQAPAeBOgDgAE1A3QAAAZgSASQgRARgZAAQgZAAgSgRQgSgSAAgZQAAgZASgSQASgQAZAAQAZAAARAQQASASAAAZgAEUA3QAAAMgIAIQgIAIgMAAQgLAAgJgIQgIgIAAgMQAAgLAIgIQAJgJALAAQAMAAAIAJQAIAIAAALgAh/hmIgmAtAkxA3QAAAMgIAIQgIAIgMAAQgLAAgJgIQgIgIAAgMQAAgLAIgIQAJgJALAAQAMAAAIAJQAIAIAAALgAkRA3QAAAZgRASQgSARgZAAQgZAAgSgRQgRgSAAgZQAAgZARgSQASgQAZAAQAZAAASAQQARASAAAZgAh/hmQgyAMg6AXQAgAFAmAFQB8APC8AGQhZhui5Asg");
	shape_2.setTransform(362.3,210);
	
	var shape_3 = new createjs.Shape();
	shape_3.graphics.f("rgba(0,0,0,0.996)").s().p("AD5AqQgSgRAAgZQAAgYASgSQARgRAaAAQAYAAASARQARASAAAYQAAAZgRARQgRASgZAAQgaAAgRgSgAEPgTQgIAJAAAKQAAAMAIAIQAIAIAMAAQALAAAJgIQAIgIAAgMQAAgKgIgJQgJgIgLAAQgMAAgIAIgAlNAqQgSgRAAgZQAAgYASgSQASgRAZAAQAZAAASARQARASAAAYQAAAZgRARQgSASgZAAQgZAAgSgSgAk2gTQgIAJAAAKQAAAMAIAIQAJAIALAAQAMAAAHgIQAJgIAAgMQAAgKgJgJQgHgIgMAAQgLAAgJAIg");
	shape_3.setTransform(358,215.6);
	
	
	res.addChild(shape_1);
	res.addChild(shape_2);//ΡΟΔΕΣ
	res.addChild(shape_3);//ΕΣΩΤΕΡΙΚΩ ΕΛΑΣΤΙΚΩΝ
	res.addChild(shape);// ΠΙΣΩ ΦΩΤΑ
	
	res.regX=360
	res.regY=222
	
	
	return res;
}

function carShape1() {
	
	var res = new createjs.Container();
	
	var shape = new createjs.Shape();
	
	shape.graphics.f("#fff").r(-45,-15,90,30)
	shape.graphics.f("#ff0000").s("#000000").ss(1,1,1).p("AGcAIIgugbIgwAAQAPAfBPgEQAOALAPALQAAAlgfApIhOAAQAOgTAAgZQAAgigXgXQgXgWghAAQghAAgYAWQgXAXAAAiQAAAZAOATInBACQANgVAAgZQAAgigYgXQgXgWghAAQghAAgXAWQgXAXAAAiQAAAKADAMQglgVgJhTIgBAAIAAgMAFGA/QAAAZgRARQgSASgZAAQgZAAgSgSQgRgRAAgZQAAgZARgSQASgRAZAAQAZAAASARQARASAAAZgAEmA/QAAALgJAJQgIAIgLAAQgMAAgIgIQgIgJAAgLQAAgMAIgIQAIgIAMAAQALAAAIAIQAJAIAAAMgAmLg8QCsgyC4gMQCsgFBABSQBggdB3BSAhthfIgnAtAkfA/QAAALgJAJQgIAIgLAAQgMAAgIgIQgIgJAAgLQAAgMAIgIQAIgIAMAAQALAAAIAIQAJAIAAAMgAj/A/QAAAZgSARQgRASgZAAQgZAAgSgSQgSgRAAgZQAAgZASgSQASgRAZAAQAZAAARARQASASAAAZgAhthfQgzAMg5AXQAgAGAlAEQB9AQC7AFQhZhti4ArgAmLg8QAOAdg4ANQgBgGAAgGQgCgOAAgQg");
	shape.setTransform(360.5,209.3);
	
	
	var shape1 = new createjs.Shape();
	shape1.graphics.f("rgba(255,255,255,0.996)").s().p("AEPAUQgIgIAAgMQAAgKAIgJQAIgIAMAAQALAAAJAIQAIAJAAAKQAAAMgIAIQgJAIgLAAQgMAAgIgIgAk2AUQgIgIAAgMQAAgKAIgJQAJgIALAAQAMAAAHAIQAJAJAAAKQAAAMgJAIQgHAIgMAAQgLAAgJgIg");
	shape1.setTransform(358,215.6);
	
	var shape2 = new createjs.Shape();
	shape2.graphics.f("rgba(0,0,0,0.996)").s().p("AD5AqQgSgRAAgZQAAgYASgSQARgRAaAAQAYAAASARQARASAAAYQAAAZgRARQgRASgZAAQgaAAgRgSgAEPgTQgIAJAAAKQAAAMAIAIQAIAIAMAAQALAAAJgIQAIgIAAgMQAAgKgIgJQgJgIgLAAQgMAAgIAIgAlNAqQgSgRAAgZQAAgYASgSQASgRAZAAQAZAAASARQARASAAAYQAAAZgRARQgSASgZAAQgZAAgSgSgAk2gTQgIAJAAAKQAAAMAIAIQAJAIALAAQAMAAAHgIQAJgIAAgMQAAgKgJgJQgHgIgMAAQgLAAgJAIg");
	shape2.setTransform(358,215.6);
	
	
	res.addChild(shape);
	res.addChild(shape2);
	//res.addChild(shape1);
	
	
	res.regX=360
	res.regY=222
	
	
	return res;
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





function aGraphTextShape() {
	var shape = new createjs.Shape();
	shape.graphics.f("#006600").s().p("ADqBTQALgGAHgKQAHgKADgQQADgQAAgRQAAgSgDgQQgCgMgDgHQgDgHgGgHQgFgHgJgGIAAgEQANAHAJAJQANANAGARQAHARAAASQAAAbgNAXQgNAWgWAKgAhyBHQgNgNgHgRQgGgRAAgTQAAgaANgXQAOgWAVgKIAAAEQgLAGgHAKQgHALgDAQQgDAPAAARQAAATACAPQADAMADAIQADAHAGAHQAFAGAJAGIAAAEQgNgHgJgJgAB5AwIgFgBQAAAAgBAAQAAABgBAAQAAAAAAAAQgBABAAAAIgDAAIAAgcIADAAQADAMAHAGQAHAHAIAAQAGAAAEgEQAEgEAAgFQAAgGgEgEQgFgEgMgGQgNgHgEgFQgEgEAAgHQAAgKAHgHQAHgHAKAAQAFAAAHACIAGACIACgBIACgDIADAAIAAAcIgDAAQgDgNgGgFQgFgEgIAAQgGAAgEADQgEADAAAEQAAAFADADQADAEAIAEIANAFQASAJAAAOQAAALgIAHQgJAHgKAAQgHAAgKgDgAA0AzIArh/IAHAAIgrB/gAjXAvQgDgEgCgVQgQAcgUAAQgMAAgHgHQgGgIAAgNQAAgNAGgLQAGgMAKgIQAKgIALAAQAIAAAFAFQAFAFACALIAIgTIANAAIgTAqQABAYAIAAQACAAACgDQACgCABgEIADAAQgCAVgKAAQgDAAgDgDgAkBgFQgLASAAAPQAAAJAEAEQADAFAGAAQAHAAAFgGQAFgHAJgUIAHgQQAAgGgEgIQgDgIgHAAQgLAAgKAUgAALAwIAAgDIABAAQAGAAACgCQADgBAAgDIABgJIAAgiQAAgJgDgEQgDgGgIAAQgEAAgFACQgEADgGAGIgBABIABAEIAAAlQAAAIABACQAAABAAAAQAAABABAAQAAABABAAQABAAAAABQADABAFAAIAAADIgoAAIAAgDQAHAAACgBQADgCABgDIAAgJIAAgiQAAgJgDgFQgEgFgHAAQgEAAgFACQgHAEgEAFIAAAqQAAAIABACQAAABAAAAQABABAAAAQABABAAAAQABABAAAAQACABAHAAIAAADIgoAAIAAgDQAGAAACgBIADgEIABgKIAAgeQAAgNgBgEIgBgEIgEgBIgGABIgBgDIAYgKIAEAAIAAASIAKgLIAJgFQAEgCAFAAQAHAAAGAFQAFAEACAJQAJgLAFgDQAHgEAGAAQAHAAAFAEQAFADACAHQACAGAAAKIAAAiIABAKIAEAEQACABAFAAIAAADgACugHIAAgCQAUgSAIgMQAIgMAAgJQAAgIgEgEQgFgFgGAAQgGAAgEADQgFAEgCAGIgCAAQABgLAGgFQAGgGAJAAQAKAAAGAGQAGAGAAAJQAAAFgDAGQgEAKgJAKIgSATIAUAAIAJgBIAEgCIAEgEIACAAIgGAPg");
	
	shape.scale = .875
	
	return shape
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