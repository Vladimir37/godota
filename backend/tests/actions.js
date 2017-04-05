const fork = require('child_process').fork;
const exec = require('child_process').exec;

var config = require('../config_test');
// var login = require('./tests/login');

var db = require('../app/models/main');

var server;

function start(done) {
    db.connectDB(config.db_port, config.database);
        
    // server = fork('server/start_server.js');
    // exec('node ../utility/new_user.js UserUser PassPass testing');
    // setTimeout(() => {
    //     resolve();
    // }, 2000);   
    // setTimeout(() => {
    //     done();
    // }, 3000);
}

function stop(done) {
    // setTimeout(() => {
        // fork('server/clean_db.js');
        // server.kill();
    //     done();
    // }, 4000);
}

exports.start = start;
exports.stop = stop;