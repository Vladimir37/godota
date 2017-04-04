var restler = require('restler');

var config = require('../../config_test.json');

function login() {
    return new Promise((resolve, reject) => {
        var path = 'http://localhost:' + config.app_port + '/auth/login';
        restler.post(path, {
            data: {
                username: 'User',
                password: 'Pass'
            }
        }).on('complete', (data, response) => {
            var path = 'http://localhost:' + config.app_port + '/auth/check';
            restler.get(path).on('complete', (data) => {
                console.log(data);
                resolve(data);
            });
        });
    });
}

module.exports = login;