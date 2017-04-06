var supertest = require('supertest');

function getTwitch(app) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_twitch')
            .then((res) => {
                resolve(res.body);
            }).catch(console.log);
    });
}

function createTwitch(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .post('/twitch/add')
            .set('Cookie', session)
            .send({
                id: 'test',
                nickname: 'TestCommand',
                country: 'Italy'
            })
            .then((res) => {
                return supertest(app).get('/api/all_twitch');
            })
            .then((res) => {
                resolve(res.body);
            }).catch(console.log);
    });
}

function editTwitch(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_twitch')
            .then((res) => {
                return supertest(app)
                    .post('/twitch/edit/' + res.body.data[0]._id)
                    .set('Cookie', session)
                    .send({
                        id: 'test_updated',
                        nickname: 'TestCommandNew',
                        country: 'Israel'
                    });
            })
            .then((res) => {
                return supertest(app).get('/api/all_twitch');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

function deleteTwitch(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_twitch')
            .then((res) => {
                return supertest(app)
                    .post('/twitch/delete/' + res.body.data[0]._id)
                    .set('Cookie', session)
            })
            .then((res) => {
                return supertest(app).get('/api/all_twitch');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

exports.getTwitch = getTwitch;
exports.createTwitch = createTwitch;
exports.editTwitch = editTwitch;
exports.deleteTwitch = deleteTwitch;