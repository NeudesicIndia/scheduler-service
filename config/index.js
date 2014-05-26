(function (config){
	
	config.setConfig = function(app){
		switch(process.env.NODE_ENV){
	        case 'development':
	        	app.set("mongodbconnectionstring", "development");
	            return;
	
	        case 'production':
	        	app.set("mongodbconnectionstring", "production");
	            return;
	
	        default:
	            return;
	    }
	};
	
})(module.exports);