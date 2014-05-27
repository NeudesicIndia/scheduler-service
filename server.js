var http = require("http");
var express = require("express");
var global = require("./global");

var app = express();

global.init(app);
var winstonInstance = app.get("winstonInstance");

var server =  http.createServer(app);

server.on('listening', function(){
	console.log('Server listening');
	winstonInstance.info("Server listening");
	var agendaInstance = app.get("agendaInstance");
	agendaInstance.processEvery('1 minute');
	agendaInstance.start();
})

process.on('SIGTERM', function () {
	  console.log("Closing");
	  winstonInstance.info("Closing");
	  app.close();
	  agendaInstance.stop();
	});

app.on('close', function () {
	  console.log("App Closed");
	  winstonInstance.info("App Closed");
	});

server.listen(3001);


