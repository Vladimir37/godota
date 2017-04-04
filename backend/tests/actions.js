const fork = require('child_process').fork;
const exec = require('child_process').exec;

var config = require('../config_test');

var server;

function start(done) {
    server = fork('server/start_server.js');
    exec('node ../utility/new_user.js User Pass testing');
    setTimeout(() => {
        done();
    }, 3000);
}

function stop() {
    fork('server/clean_db.js');
    server.kill();
}

exports.start = start;
exports.stop = stop;