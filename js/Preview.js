function Preview() {
	
	this.machineX;
	this.machineY;
	
	var _element;
	var _svg;
	var _code;
	var _currentStep = 0;
	var _steps = [];
	var _self = this;
	var _scale = 1;

	this.init = function(element) {
		_element = element;
		if (SVG.supported) {
			_svg = SVG(_element).size("50%","50%");
		} else {
			alert('SVG not supported');
		}
	};
	this.setContent = function(code) {
		_code = code;
		if(_code.length === 0) return;
		_element.className = "show";
		draw();
	};
	this.setStep = function(step) {
		if(step > _code.length-1) step = _code.length-1;
		if(step < 0) step = 0;
		if(step === _currentStep) return;
		_currentStep = step;
		
		for(var i=0;i<_steps.length;i++) {
			var step = _steps[i];
			if(step === undefined) continue;
			step.setAttribute('opacity',((i > _currentStep)? 0.1 : 1));
			/*var classes = step.getAttribute('class');
			var fade = i > _currentStep;
			var faded = classes.indexOf("fade") !== -1;
			if(i > _currentStep) {
				if(!faded) classes += " fade";
			} else {
				if(faded) classes = classes.replace(" fade","");
			}
			step.setAttribute('class',classes);*/
		}
	}
	
	function draw() {
		
		_steps = [];
		_svg.clear();
		var px = 0;
		var py = 0;
		for (var i in _code.lines) {
			var line = _code.lines[i];
			//console.log("  line: ",line);
			
			var setPointX = line[_self.machineX];
			var setPointY = line[_self.machineY];
			//console.log("    setPointX: ",setPointX);
			//console.log("    setPointY: ",setPointY);
			
			var deltaX = (setPointX)? Number.parseInt(setPointX.P) : 0;
			var deltaY = (setPointY)? Number.parseInt(setPointY.P) : 0;
			//console.log("    deltaX: ",deltaX);
			//console.log("    deltaY: ",deltaY);
			
			var x = px + deltaX;
			var y = py + deltaY;
			var line = _svg.line(px,py,x,y);
			var step = line.node;
			_steps.push(step);
			px = x;
			py = y;
		}
	}
	function getScale() {
		return _scale;
	}
	function setScale(scale) {
		_scale = scale;
		draw();
	}
}
