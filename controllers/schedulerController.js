(function (schedulerController){
	
	schedulerController.init = function (app){
		app.get("/scheduler/:clienttenant", function (req, res){
			var clientTenant = req.params.clienttenant;
			res.set("Content-Type", "application/json");
			res.send({ client: clientTenant });
		});
	};
	
})(module.exports);
