var supertest = require('supertest');

function getNews(app) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_news')
            .then((res) => {
                resolve(res.body);
            });
    });
}

function createNews(app, session) {
    //
}

exports.getNews = getNews;