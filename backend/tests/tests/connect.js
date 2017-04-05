var supertest = require('supertest');

function checkConnect(app) {
    return new Promise((resolve) => {
        supertest(app)
            .get('/api/all_news')
            .end(function(err, res) {
                resolve(res.body.error);
            });
    });
}

module.exports = checkConnect;