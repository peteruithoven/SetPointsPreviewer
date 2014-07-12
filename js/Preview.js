function Preview() {
	
	this.machineX;
	this.machineY;
	
	var _element;
	var _svg;
	var _code;
	var _currentStep = 0;
	var _steps       = [];
	var _self        = this;
	var _scale       = 1;

	this.init = function(element) {
		_element = element;
		_svg = d3.select("#preview svg");
		console.log("  _svg: ",_svg);
	};
	this.setContent = function(code) {
		console.log("Preview:setContent");
		_code = code;
		if(_code.length === 0) return;
		_element.className = "show";
		update();
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
	
	function update() {
		console.log("Preview:update");

		var lineAttr = {
			x1: function(d,i){ return (i==0)? 0 : _code.lines[i-1].x},
			y1: function(d,i){ return (i==0)? 0 : _code.lines[i-1].y},
			x2: function(d){ return d.x},
			y2: function(d){ return d.y}
		}
		var lines = _svg.selectAll("line").data(_code.lines)
			.attr(lineAttr);
		lines.enter().append("line")
			.attr(lineAttr);
	}
	function getScale() {
		return _scale;
	}
	function setScale(scale) {
		_scale = scale;
		update();
	}
}
