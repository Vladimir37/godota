var restler = require('restler');
var supertest = require('supertest');

// var config = require('../../config_test.json');
var start = require('../server/start_server');

function login() {
    return new Promise((resolve, reject) => {
        supertest(start(true))
            // .get('/auth/check')
            .get('/api/all_news')
            .end(function(err, res) {
                console.log(res.body)
                resolve(res.body.logged)
            });
        // var path = '/auth/login';
        // restler.post(path, {
        //     data: {
        //         username: 'UserUser',
        //         password: 'PassPass'
        //     }
        // }).on('complete', (data, response) => {
        //     // console.log(response);
        //     // var cookie = response.headers['set-cookie'];
        //     // console.log(cookie);
        //     var path = '/auth/check';
        //     restler.get(path, {
        //         // headers: {
        //         //     Cookie: cookie.split(';')[0]
        //         // }
        //     }).on('complete', (data) => {
        //         console.log(data);
        //         resolve(data);
        //     });
        // });
    });
}

module.exports = login;