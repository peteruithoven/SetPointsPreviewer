function Code() {
	
	this.machines = {};
	this.lines = [];
	this.length = 0;
	
	var _setPointSets = {}; // array of raw setpoints per machine
	var _self = this;

	this.concat = function(content,machineLabel) {
		console.log("concat");
		var newSetPoints = JSON.parse(content);
		
		var address = newSetPoints[0].A;
		_self.machines[machineLabel] = address; // store address under machineLabel
		console.log("  _self.machines: ",_self.machines);
		
		// collect setPoints per machine address (arrays in array)
		if(_setPointSets[address] === undefined) {
			_setPointSets[address] = [];
		}
		_setPointSets[address] = _setPointSets[address].concat(newSetPoints);
		console.log("  _setPointSets: ",_setPointSets);
		
		parse();
	};
	function parse() {
		
		_self.lines = {};
		_self.length = 0;
		var absoluteTimes = {}; // absolute time per machine
		// go through all set points
		for (var i in _setPointSets) {
			var setPointSet = _setPointSets[i];
			for (var j in setPointSet) {
				var setPoint = setPointSet[j];
				//console.log("  setPoint: ",setPoint);
				
				// calculate absolute time (per machine)
				t = absoluteTimes[setPoint.A];
				if (t === undefined) { t = 0 };
				absoluteTimes[setPoint.A] = t += Number.parseInt(setPoint.T);
				//   collect raw setpints per absolute time
				var line = _self.lines[t];
				if(line === undefined) {
					line = _self.lines[t] = {};
					_self.length++;
				}
				line[setPoint.A] = setPoint;
			}
		}
		
		// sort lines based on absolute time
		_self.lines = sortObj(_self.lines);
		
		for (var timeIndex in _self.lines) {
			var line = _self.lines[timeIndex];
			console.log("  "+timeIndex+": line: ",line);
		}
	}
	function sortObj(obj){
		var sortedKeys = [];
		var sortedObj = {};

		// Separate keys and sort them
		for (var i in obj){
			sortedKeys.push(i);
		}
		sortedKeys.sort();

		// Reconstruct sorted obj based on keys
		for (var i in sortedKeys){
			sortedObj[sortedKeys[i]] = obj[sortedKeys[i]];
		}
		return sortedObj;
	}

	this.getMachine = function(label) {
		return _self.machines[label];
	}
}
/* Setpoint:
 * {
 * 	A=101, //address
 * 	T=123, //time (0..65000 milliseconds) (relative)
 * 	P=-456 //position (-32000..+32000 steps!) (relative)
 * }
 */

/* Lines:
 * Object {
 * 	2000: Object {
 * 		101: Object { A: "101", T: "2000", P: "100" },
 * 	},
 * 	4000: Object {
 * 		101: Object { A: "101", T: "2000", P: "-100" },
 * 		102: Object { A: "102", T: "2000", P: "100" },
 * 	},
 * }
 */