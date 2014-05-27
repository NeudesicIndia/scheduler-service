(function(jobs){
	
	jobs.init = function(app){
		var agendaInstance = app.get("agendaInstance");
		var winstonInstance = app.get("winstonInstance");
		var joblogs = winstonInstance.loggers.get("joblogs");
		
		var jobName = app.get("reportemailjobename");
		agendaInstance.define(jobName, function(job, done) {
		  console.log(jobName + " job with id " + job.attrs._id);
		  console.log(JSON.stringify(job.attrs.data));
		  console.log(new Date().getMinutes());
		  joblogs.info("Job run success", { id: job.attrs._id, schedule: job.attrs.data.schedule });
		  done();
		});
	}
	
})(module.exports);
