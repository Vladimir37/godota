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

function editContentNews(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_news')
            .then((res) => {
                return supertest(app)
                    .post('/news/edit/' + res.body.data[0]._id)
                    .set('Cookie', session)
                    .send({
                        date: new Date(),
                        title: 'New test news',
                        text: 'NewTextNewText',
                        tags: ' four five six '
                    });
            })
            .then((res) => {
                return supertest(app)
                    .get('/api/all_news');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

function deleteMainImageNews(app, session) {
    return new Promise((resolve, reject) => {
        var old_image;
        supertest(app)
            .get('/api/all_news')
            .then((res) => {
                old_image = res.body.data[0].mainImage;
                return supertest(app)
                    .post('/news/main_image_delete/' + res.body.data[0]._id)
                    .set('Cookie', session);
            })
            .then((res) => {
                return supertest(app)
                    .get('/api/all_news');
            })
            .then((res) => {
                var result = {
                    response: res.body,
                    image: old_image
                };
                resolve(result);
            });
    });
}

exports.getNews = getNews;
exports.createNews = createNews;
exports.editContentNews = editContentNews;
exports.deleteMainImageNews = deleteMainImageNews;