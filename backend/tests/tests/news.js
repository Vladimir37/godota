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
    return new Promise((resolve, reject) => {
        supertest(app)
            .post('/news/add')
            .set('Cookie', session)
            .field('title', 'Test news')
            .field('text', 'TextTextText')
            .field('tags', ' one two three ')
            .attach('main_image', __dirname + '/../imgs/img1.png')
            .attach('gallery_0', __dirname + '/../imgs/img2.jpg')
            .then((res) => {
                return supertest(app)
                    .get('/api/all_news');
            })
            .then((res) => {
                resolve(res.body);
            }).catch(console.log);
    });
}

exports.getNews = getNews;
exports.createNews = createNews;