const fork = require('child_process').fork;
const exec = require('child_process').exec;

var config = require('../config_test');

var server;

function start() {
    server = fork('server/start_server.js');
    // exec('node ../utility/new_user.js User Pass testing');
}

function stop() {
    fork('server/clean_db.js');
    server.kill();
}

exports.start = start;
exports.stop = stop;