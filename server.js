var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var controllers = require("./controllers");

var app = express();
app.use(bodyParser());

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
