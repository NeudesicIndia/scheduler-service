var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var controllers = require("./controllers");
var config = require("./config");

var app = express();
config.setConfig(app);
app.use(bodyParser());

//http://expressjs.com/guide.html#error-handling
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

//Driven by NODE_ENV (production, development)
//default is development
//app.configure("production", function (){
//	app.set('mongoDbConnectionString', ""); 
//});

//app.configure("development", function (){
//	app.set('mongoDbConnectionString', "");
//});

//Map the routes
controllers.init(app);

var server =  http.createServer(app);

server.listen(3001);

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