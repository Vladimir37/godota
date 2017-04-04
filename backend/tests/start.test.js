const fork = require('child_process').fork;
const exec = require('child_process').exec;

function start() {
    var server = fork('start_server.js');
    exec('node ../utility/new_user.js User Pass testing');
}

start();