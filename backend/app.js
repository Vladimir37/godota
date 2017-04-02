var http = require('http');

var config = require('./config');
var app = require('./app/main');

app.listen(config.app_port);