(function (schedulerController){
	
	var schema = require("../schema");
	var Validator = require('jsonschema').Validator;
	var validator = new Validator();
	
	schedulerController.init = function (app){
		app.get("/scheduler/:clienttenant", function (req, res){
			var user = req.query.user;
			var schedule = req.param.schedule;
			
			var clientTenant = req.params.clienttenant;
			res.set("Content-Type", "application/json");
			res.send({ client: clientTenant, user: user });
		});
		
		app.post("/scheduler/:clienttenant", function (req, res){
			var user = req.query.user;
			var schedule = req.param.schedule;
			
			var clientTenant = req.params.clienttenant;
			var schedule = req.body.schedule;
			var schemaValidationResult = validator.validate(schedule, schema.schedule);
			console.log(schemaValidationResult);
			console.log(schemaValidationResult.errors.length === 0? "Good schema" : "Bad schema");
			res.set("Content-Type", "application/json");
			res.send({ client: clientTenant, user: user });
		});
	};
	
})(module.exports);
