function Description() {
	
	var _element;
	var _simpleCode;
	var _self = this;

	this.init = function(element) {
		_element = element;	
	};
	this.setContent = function(simpleCode) {
		_simpleCode = simpleCode;
	};
	this.setLine = function(lineIndex) {
		//console.log("setContent: ",lineIndex);
		var line = _simpleCode.commands[lineIndex];
		var rawLine = _simpleCode.lines[lineIndex];
		var text = " ";
		text += COMMAND_DESC[line.command];
		text += ": ";
		switch(line.command) {
			case SimpleCode.COMMAND.MOVE:
			case SimpleCode.COMMAND.CUT:
				text += Math.round(line.params[0]*SimpleCode.SCALE);
				text += " x ";
				text += Math.round(line.params[1]*SimpleCode.SCALE);
				break;
			case SimpleCode.COMMAND.SET: // Set parameter 
				text += PARAM_DESC[line.params[0]];
				text += " = ";
				text += Math.round(line.params[1]*SimpleCode.SCALE);
				break;
			case SimpleCode.COMMAND.BITMAP: // Bitmap data 
				text += "bpp = " + line.params[0];
				text += ", width = " + line.params[1];
				break;
			case SimpleCode.COMMAND.JOB_X_MIN:
			case SimpleCode.COMMAND.JOB_X_MAX:
			case SimpleCode.COMMAND.JOB_Y_MIN:
			case SimpleCode.COMMAND.JOB_Y_MAX:
				text += Math.round(line.params[0]*SimpleCode.SCALE);
				break;
			default: 
				for (var i=0; i<line.params.length; i++) {
					text += line.params[i];
					if(i < line.params.length-1) {
						text += ", ";
					}
				}
				break;
		}
		_element.textContent = lineIndex + ": " + rawLine +": "+text;
	};
}
