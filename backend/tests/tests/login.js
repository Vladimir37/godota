var supertest = require('supertest');

var cookie;

function login(app) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/auth/check')
            .then((res) => {
                cookie = res.headers['set-cookie'][0].split(';')[0];
                return supertest(app)
                    .post('/auth/login')
                    .set('Cookie', cookie)
                    .send({
                        username: 'UserUser',
                        password: 'PassPass'
                    });
        }).then((res) => {
            return supertest(app)
                .get('/auth/check')
                .set('Cookie', cookie);
        }).then((res) => {
            var result = {
                logged: res.body.logged,
                session: cookie
            };
            resolve(result);
        }).catch((err) => {
            console.log(err);
        });
    });
}

function logout(app, session) {
    return new Promise((resolve, reject) => {
        var result = {
            first: null,
            second: null
        };
        supertest(app)
            .get('/auth/check')
            .set('Cookie', session)
            .then((res) => {
                result.first = res.body.logged;
                return supertest(app)
                    .get('/auth/logout')
                    .set('Cookie', session);
            })
            .then((res) => {
                return supertest(app)
                    .get('/auth/check')
                    .set('Cookie', session);
            }).then((res) => {
                result.second = res.body.logged;
                resolve(result);
            });
    });
}

exports.login = login;
exports.logout = logout;