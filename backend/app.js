var http = require('http');

var config = require('./config');
var app = require('./app/main');
var db = require('./app/models/main');

app().listen(config.app_port);
