function Code() {
	
	this.machines      = {};
	this.lines         = [];
	this.length        = 0;
	this.duration    = 0;
	
	var _setPointSets  = {}; // array of raw setpoints per machine
	var _self          = this;

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
		
		_self.lines = [];
		var absoluteTimes = {}; // absolute time per machine
		
		// go through all set points
		// group setPoints based on absolute time
		for (var i in _setPointSets) {
			var setPointSet = _setPointSets[i];
			for (var j in setPointSet) {
				var setPoint = setPointSet[j];
				var machineLabel = getMachineLabel(setPoint.A);
				
				// convert point and time to ints
				setPoint.T = Number.parseInt(setPoint.T);
				setPoint.P = Number.parseInt(setPoint.P);
				
				// calculate absolute time (per machine)
				time = absoluteTimes[machineLabel];
				if (time === undefined) { time = 0 };
				absoluteTimes[machineLabel] = time += setPoint.T;
				
				// find existing line or add new
				var line = getLine(time);
				if(line === undefined) {
					line = {time:time,setPoints:{}};
					_self.lines.push(line);
				}
				//   collect raw setpints per absolute time
				line.setPoints[machineLabel] = setPoint;
			}
		}
		
		// sort lines based on absolute time
		_self.lines.sort(sortOnTime)
		
		// parse absolute positions per axis
		var absolutePos = {}; // absolute position per machine
		for (var machineLabel in _self.machines) {
			absolutePos[machineLabel] = 0;
		}
		for (var i in _self.lines) {
			var line = _self.lines[i];			
			for (var machineLabel in _self.machines) {
				//absolutePos[machineLabel] = 0;
				//var machineAddress = _self.machines[machineLabel]
				var setPoint = line.setPoints[machineLabel];
				if(setPoint !== undefined) {;
					absolutePos[machineLabel] += setPoint.P;
				}
				line[machineLabel] = absolutePos[machineLabel];
			}
			_self.duration = line.time; // store duration
		}
		
		console.log("lines:");
		for (var i in _self.lines) {
			var line = _self.lines[i];
			console.log("  ",line);
		}
		_self.length = _self.lines.length;
	}
	function sortOnTime(a, b) {
		if(a.time < b.time) return -1;
		else if(a.time > b.time) return 1;
		else 0;
	}
	function getLine(time) {
		for (var i in _self.lines) {
			var line = _self.lines[i];
			if(line.time === time) return line;
		}
	}
	function getMachineLabel(machineAddress) {
		for (var machineLabel in _self.machines) {
			if(_self.machines[machineLabel] === machineAddress) return machineLabel;
		}
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
 * Array [
 *  {
 * 		time: 2000,
 * 		x: 100,
 * 		y: 0,
 * 		setPoints: Object {
 * 			101: Object { A: "101", T: "2000", P: "100" },
 * 		},
 * 	},
 * 	{
 * 		time: 4000,
 * 		x: 0,
 * 		y: 100,
 * 		setPoints: Object {
 * 			101: Object { A: "101", T: "2000", P: "-100" },
 * 			102: Object { A: "102", T: "2000", P: "100" },
 * 		}
 * 	}
 * ]
 */
