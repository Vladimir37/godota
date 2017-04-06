var supertest = require('supertest');

var cookie;

function login(app) {
    return new Promise((resolve, reject) => {
        var agent = supertest(app);
        agent.get('/auth/check')
        .then((res) => {
            cookie = res.headers['set-cookie'][0].split(';')[0];
            return agent.post('/auth/login')
                .set('Cookie', cookie)
                .send({
                    username: 'UserUser',
                    password: 'PassPass'
                });
        }).then((res) => {
            return agent.get('/auth/check')
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

module.exports = login;