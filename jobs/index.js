(function(jobs){
	
	jobs.init = function(app){
		var agendaInstance = app.get("agendaInstance");
		
		var jobName = 'adding new users';
		agendaInstance.define(jobName, function(job, done) {
		  console.log(jobName + " job with id " + job.attrs._id);
		  console.log(JSON.stringify(job.attrs.data));
		  console.log(new Date().getMinutes());
		  done();
		});
		
		var job = agendaInstance.create(jobName, {prop1: 'prop1value', prop2: 'prop2value'});
		job.repeatEvery('*/1 * * * *');
		job.save(function(err) {
		  console.log("Job successfully saved for every 1 mins");
		});
	}
	
})(module.exports);
