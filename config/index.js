(function (config){
	
	config.setConfig = function(app){
		switch(process.env.NODE_ENV){
	        case 'development':
	        	app.set("mongodbconnectionstring", "mongodb://127.0.0.1:27017/schedule");
	            return;
	
	        case 'production':
	        	app.set("mongodbconnectionstring", "mongodb://127.0.0.1:27017/schedule");
	            return;
	
	        default:
	            return;
	    }
	};
	
})(module.exports);