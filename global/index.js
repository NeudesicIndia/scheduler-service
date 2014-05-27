(function(global){
	
	var bodyParser = require('body-parser');
	var Agenda = require("agenda");
	var config = require("../config");
	var controllers = require("../controllers");
	var jobs = require("../jobs");
	
	global.init = function(app){
		config.setConfig(app);
		app.use(bodyParser());
		
		//http://expressjs.com/guide.html#error-handling
		app.use(logErrors);
		app.use(clientErrorHandler);
		app.use(errorHandler);

		//parse application/vnd.api+json as json
		app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
		
		var agenda = new Agenda({db: { address: app.get("mongodbconnectionstring")}});
		app.set("agendaInstance", agenda);
		
		controllers.init(app);
		
		jobs.init(app);
	};
	
	function logErrors(err, req, res, next) {
		  console.error(err.stack);
		  next(err);
		}

	function clientErrorHandler(err, req, res, next) {
		  if (req.xhr) {
		    res.send(500, { error: 'Something blew up!' });
		  } else {
		    next(err);
		  }
		}

	function errorHandler(err, req, res, next) {
		  res.status(500);
		  res.render('error', { error: err });
		}
	
})(module.exports);