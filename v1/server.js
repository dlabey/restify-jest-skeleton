'use strict';

var config = require('../config');
var path = require('path');
var restify = require('restify');
var resources = require('../resources')(config, path.join(__dirname, '/controllers'));

// Server
var server = restify.createServer();

// Plugins
server.use(restify.bodyParser());

// Endpoints
server.get('/', function(req, res, next) {
  resources.controllers['example_controller'].helloWorld(req, res, next);
});

// Listen
server.listen(3000);
