(function(jobs){
	
	jobs.init = function(app){
		var agendaInstance = app.get("agendaInstance");
		
		var jobName = app.get("reportemailjobename");
		agendaInstance.define(jobName, function(job, done) {
		  console.log(jobName + " job with id " + job.attrs._id);
		  console.log(JSON.stringify(job.attrs.data));
		  console.log(new Date().getMinutes());
		  done();
		});
	}
	
})(module.exports);
