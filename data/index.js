(function(data){
	
	var seedData = require("./seedData");
	
	data.getSchedules = function(next){
		next(null, seedData.initialNotes);
	};
	
})(module.exports);