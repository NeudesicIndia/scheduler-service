(function (homeController){
	
	homeController.init = function (app){
		
		app.get("/", function (req, res){
			res.send("Welcome to Scheduler Service that is powered by gruntjs nodemon");
		});
		
	};
	
})(module.exports);