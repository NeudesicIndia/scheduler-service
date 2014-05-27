(function (schedulerController){
	
	var schema = require("../schema");
	var Validator = require('jsonschema').Validator;
	var mongo = require('mongoskin');
	var validator = new Validator();
	
	schedulerController.init = function (app){
		var agendaInstance = app.get("agendaInstance");
		var db = mongo.db(app.get("mongodbconnectionstring"), {native_parser:true});
		
		app.get("/scheduler/:clienttenant", function (req, res){
			var user = req.query.user;
			var id = req.query.id;
			var clientTenant = req.params.clienttenant;
			
			var filter = {};
			
			if(typeof id !== "undefined"){
				filter["_id"] = mongo.helper.toObjectID(id);
			}
			
			if(typeof user !== "undefined"){
				filter["data.schedule.user"] = user;
			}
			
			if(typeof clientTenant !== "undefined"){
				filter["data.clientTenant"] = clientTenant;
			}
			
			agendaInstance.jobs(filter, function(err, jobs) {
				if(jobs.length > 0 && typeof jobs[0] !== 'undefined'){
					res.set("Content-Type", "application/json");
					var jobsResponse = new Array();
					
					jobs.forEach(function(job){
						jobsResponse.push({ id : job.attrs._id, schedule : job.attrs.data.schedule });
					});
					
					res.send(200, jobsResponse);
				}
				else{
					res.set("Content-Type", "application/json");
					res.send(404);
				}
			});			
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
			
			console.log("config is: " + app.get("mongodbconnectionstring"));
			
			if(schemaValidationResult.errors.length !== 0){
				res.send(400, schemaValidationResult.errors);
			}
			else{
				var jobData = {
					clientTenant: clientTenant,
					schedule: schedule
				};
				var job = agendaInstance.create(app.get("reportemailjobename"), jobData);
				job.repeatEvery(jobData.schedule.scheduleCRONexp);
				job.save(function(err) {
					if(!err){
						console.log("Job successfully saved.");
						res.set("Content-Type", "application/json");
						res.send(201, job.attrs._id);
					}
					else{
						res.send(500, "Unable to create schedule");
					}
				});
			}
		});
		
		app.delete("/scheduler/:clienttenant", function (req, res){
			var user = req.query.user;
			var id = req.query.id;
			var clientTenant = req.params.clienttenant;
			
			var filter = {};
			
			if(typeof id !== "undefined"){
				filter["_id"] = db.helper.toObjectID(id);
			}
			
			if(typeof user !== "undefined"){
				filter["data.schedule.user"] = user;
			}
			
			if(typeof clientTenant !== "undefined"){
				filter["data.clientTenant"] = clientTenant;
			}
			
			db.bind('agendaJobs');
			db.agendaJobs.remove(filter, function(err){
				if(!err){
			    	console.log("Successfully removed job from collection");
			    	res.send(200);
			    }
				else{
					res.set("Content-Type", "application/json");
					res.send(404);
				}
			});
		});
		
	};
	
})(module.exports);
