var dropZoneX = new DropZone();
var dropZoneY = new DropZone();
var code = new Code();
var currentLine = 0;
var preview = new Preview();
var help = document.getElementById('help')
//var description = new Description();

preview.init(document.getElementById('preview'));
//preview.setContent(simpleCode);
dropZoneX.init(document.getElementById('dropzone-x'));
dropZoneY.init(document.getElementById('dropzone-y'));
dropZoneX.onload = function(content) {
	help.className = "hide";
	console.log("  codeX: ",content);
	code.concat(content,"x");
	//console.log("  >codeX: ",codeX.lines);
	preview.machineX = code.getMachine("x");
	preview.setContent(code);
	//description.setContent(simpleCode);
};
dropZoneY.onload = function(content) {
	help.className = "hide";
	console.log("  codeY: ",content);
	code.concat(content,"y");
	//console.log("  >codeX: ",codeY.lines);
	preview.machineY = code.getMachine("y");
	preview.setContent(code);
	//description.setContent(simpleCode);
};
//description.init(document.getElementById('description'));

/*document.onmousemove = function(event) {
	var mouseX = (event.pageX !== undefined)? event.pageX : event.clientX;
	var width = document.width;
	var perc = mouseX/document.body.clientWidth;
	setCurrentLine(Math.round(simpleCode.length*perc));
}

document.onkeydown = function(event) {
	var multiplier = event.shiftKey? 10 : 1;
	switch(event.keyCode) {
		case 37: //left
			setCurrentLine(currentLine-1*multiplier);
			break;
		case 39: //right
			setCurrentLine(currentLine+1*multiplier);
			break;
		case 38: //up
			setCurrentLine(currentLine-1*multiplier);
			break;
		case 40: //down
			setCurrentLine(currentLine+1*multiplier);
			break;
	}
}

function setCurrentLine(line) {
	if(line > simpleCode.length-1) line = simpleCode.length-1;
	if(line < 0) line = 0;
	if(currentLine === line) return;
	currentLine = line;
	//console.log("  currentLine: ",currentLine);
	preview.setStep(currentLine);
	description.setLine(currentLine);
}*/