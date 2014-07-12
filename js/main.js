var dropZoneX     = new DropZone();
var dropZoneY     = new DropZone();
var code          = new Code();
var currentLine   = 0;
var preview       = new Preview();
var help          = document.getElementById('help')
//var description = new Description();

preview.init(document.getElementById('preview'));
preview.setContent(code);
dropZoneX.init(document.getElementById('dropzone-x'));
dropZoneY.init(document.getElementById('dropzone-y'));
dropZoneX.onload = function(content) {
	help.className = "hide";
	console.log("  codeX: ",content);
	code.concat(content,"x");
	//console.log("  >codeX: ",codeX.lines);
	preview.machineX = code.getMachine("x");
	update();
};
dropZoneY.onload = function(content) {
	help.className = "hide";
	console.log("  codeY: ",content);
	code.concat(content,"y");
	//console.log("  >codeX: ",codeY.lines);
	preview.machineY = code.getMachine("y");
	update();
};
function update() {
	preview.setContent(code);
	setCurrentLine(code.length-1);
	//description.setContent(code);
}
//description.init(document.getElementById('description'));

document.onmousemove = function(event) {
	var mouseX = (event.pageX !== undefined)? event.pageX : event.clientX;
	var width = document.width;
	var perc = mouseX/document.body.clientWidth;
	
	// we take 105% of duration so that it's possible to reach the last setPoint
	var currentTime = code.duration*1.05*perc;
	
	var curentLineIndex = -1;
	for (i in code.lines) {
		var line = code.lines[i];
		if(line.time >= currentTime) break;
		curentLineIndex++;
	}
	//console.log("  line: ",curentLineIndex,"/",code.length);
	setCurrentLine(curentLineIndex);
}

document.onkeydown = function(event) {
	var multiplier = event.shiftKey? 10 : 1;
	switch(event.keyCode) {
		case 37: //left
		case 38: //up
			setCurrentLine(currentLine-1*multiplier);
			break;
		case 39: //right
		case 40: //down
			setCurrentLine(currentLine+1*multiplier);
			break;
	}
}

function setCurrentLine(line) {
	if(line > code.length-1) line = code.length-1;
	if(line < 0) line = 0;
	if(currentLine === line) return;
	currentLine = line;
	//console.log("  currentLine: ",currentLine);
	preview.setStep(currentLine);
	//description.setLine(currentLine);
}
