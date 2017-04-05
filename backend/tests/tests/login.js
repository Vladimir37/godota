var supertest = require('supertest');

var cookie;

function login(app) {
    return new Promise((resolve, reject) => {
        var agent = supertest(app);
        agent
            .get('/auth/check')
            .end((err, res) => {
                cookie = res.headers['set-cookie'][0].split(';')[0];
                agent.post('/auth/login')
                    .set('Cookie', cookie)
                    .send({
                        username: 'UserUser',
                        password: 'PassPass'
                    })
                    .end((err, res) => {
                        agent
                            .get('/auth/check')
                            .set('Cookie', cookie)
                            .end((err, res) => {
                                resolve(res.body.logged);
                            });
                    });
            });
    });
}

module.exports = login;