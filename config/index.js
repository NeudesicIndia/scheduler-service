(function (config){
	
	config.setConfig = function(app){
		
		app.set("reportemailjobename", "sendreportemail");
		
		var environment = process.env.NODE_ENV;
		
		if(typeof environment === "undefined"){
			environment = 'development';
		}
		
		switch(environment){
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