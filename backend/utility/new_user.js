var process = require('process');
var md5 = require('md5');

var Models = require('../app/models/main');

var config = require('../config');
var config_test = require('../config_test');

function creating() {
    var login = process.argv[2];
    var pass = process.argv[3];
    var testing = process.argv[4];

    if (!login || !pass) {
        console.log('----------------------------------------------');
        console.log('Incorrect name or password');
        console.log('Run new_user.js like this:');
        console.log('"node new_user.js Username Password"');
        console.log('----------------------------------------------');
        process.exit(1);
        return false;
    }

    if (testing == 'testing') {
        Models.connectDB(config_test.db_port, config_test.database);
    } else {
        Models.connectDB(config.db_port, config.database);
    }

    Models.admin.findOne({
        login
    }).then(function(user) {
        if (user) {
            console.log('----------------------------------------------');
            console.log('The user with this login already exists');
            console.log('----------------------------------------------');
            process.exit(2);
        }
        return Models.admin.create({
            login,
            pass: md5(pass)
        });
    }).then(function() {
        console.log('User was created!');
        process.exit(0);
    }).catch(function(err) {
        console.log('----------------------------------------------');
        console.log('Database error:');
        console.log(err);
        console.log('----------------------------------------------');
        process.exit(1);
    });
}

creating();