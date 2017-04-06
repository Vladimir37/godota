var supertest = require('supertest');

function getYoutube(app) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_youtube')
            .then((res) => {
                resolve(res.body);
            }).catch(console.log);
    });
}

function createYoutube(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .post('/youtube/add')
            .set('Cookie', session)
            .send({
                id: 'test',
                name: 'TestCommand',
                title: 'FirstTitle'
            })
            .then((res) => {
                return supertest(app).get('/api/all_youtube');
            })
            .then((res) => {
                resolve(res.body);
            }).catch(console.log);
    });
}

function editYoutube(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_youtube')
            .then((res) => {
                return supertest(app)
                    .post('/youtube/edit/' + res.body.data[0]._id)
                    .set('Cookie', session)
                    .send({
                        id: 'test_updated',
                        name: 'TestCommandNew',
                        title: 'SecondTitle'
                    });
            })
            .then((res) => {
                return supertest(app).get('/api/all_youtube');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

function deleteYoutube(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_youtube')
            .then((res) => {
                return supertest(app)
                    .post('/youtube/delete/' + res.body.data[0]._id)
                    .set('Cookie', session)
            })
            .then((res) => {
                return supertest(app).get('/api/all_youtube');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

exports.getYoutube = getYoutube;
exports.createYoutube = createYoutube;
exports.editYoutube = editYoutube;
exports.deleteYoutube = deleteYoutube;