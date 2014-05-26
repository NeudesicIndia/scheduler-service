var http = require("http");
var express = require("express");
var global = require("./global");

var app = express();

global.init(app);

var server =  http.createServer(app);
server.listen(3001);
server.on('listening', function(){
	console.log('Server listening');
	var agendaInstance = app.get("agendaInstance");
	agendaInstance.processEvery('1 minute');
	agendaInstance.start();
})

