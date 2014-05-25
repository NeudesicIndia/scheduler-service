(function (controllers){
	
	var homeController = require("./homeController");
	var schedulerController = require("./schedulerController")
	
	controllers.init = function(app){
		homeController.init(app);
		schedulerController.init(app);
	};
	
})(module.exports);