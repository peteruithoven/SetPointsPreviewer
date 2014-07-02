function Code() {
	
	this.machines = {};
	this.lines = [];
	this.length = 0;
	
	var _setPoints = []; // concatenated raw setpoints
	var _self = this;

	this.concat = function(content,machineLabel) {
		console.log("concat");
		var newCode = JSON.parse(content);
		
		_self.machines[machineLabel] = newCode[0].A; // store address under machineLabel
		console.log("  _self.machines: ",_self.machines);
		_setPoints = _setPoints.concat(newCode);
		_setPoints.sort(sortOnTime)
		console.log("  _setPoints: ",_setPoints);
		parse();
	};
	
	function sortOnTime(a, b) {
		if(a.T < b.T) return -1;
		else if(a.T > b.T) return 1;
		else 0;
	}
	function parse() {
		_self.lines = [];
		_self.length = 0;
		for (var i in _setPoints) {
			var setPoint = _setPoints[i];
			var line = _self.lines[setPoint.T];
			if(line === undefined) {
				line = _self.lines[setPoint.T] = {};
				_self.length++;
			}
			line[setPoint.A] = setPoint;
		}
		for (var timeIndex in _self.lines) {
			var line = _self.lines[timeIndex];
			console.log("  "+timeIndex+": line: ",line);
		}
		console.log("  _self.length: ",_self.length);
	}
	this.getMachine = function(label) {
		return _self.machines[label];
	}
}
/* Setpoint:
 * {
 * 	A=101, //address
 * 	T=123, //time (0..65000 milliseconds)
 * 	P=-456 //position (-32000..+32000 steps!)
 * }
 */