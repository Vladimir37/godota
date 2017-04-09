var supertest = require('supertest');

function getSymbols(app) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_symbols')
            .then((res) => {
                resolve(res.body);
            });
    });
}

function createSymbols(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .post('/symbols/add')
            .set('Cookie', session)
            .field('name', 'testsym')
            .attach('file', __dirname + '/../imgs/img1.png')
            .then((res) => {
                return supertest(app)
                    .get('/api/all_symbols');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

function editNameSymbols(app, session) {
    return new Promise((resolve, reject) => {
        supertest(app)
            .get('/api/all_symbols')
            .then((res) => {
                var target_symbol = res.body.data[0];
                return supertest(app)
                    .post('/symbols/edit_name/' + target_symbol._id)
                    .set('Cookie', session)
                    .send({
                        name: 'newsymname'
                    });
            })
            .then((res) => {
                return supertest(app)
                    .get('/api/all_symbols');
            })
            .then((res) => {
                resolve(res.body);
            });
    });
}

function editFileSymbols(app, session) {
    return new Promise((resolve, reject) => {
        var target_symbol;
        supertest(app)
            .get('/api/all_symbols')
            .then((res) => {
                target_symbol = res.body.data[0];
                return supertest(app)
                    .post('/symbols/edit_image/' + target_symbol._id)
                    .set('Cookie', session)
                    .attach('image', __dirname + '/../imgs/img2.jpg')
            })
            .then((res) => {
                return supertest(app)
                    .get('/api/all_symbols');
            })
            .then((res) => {
                var result = {
                    image: target_symbol.file,
                    response: res.body
                };
                resolve(result);
            });
    });
}

function deleteSymbols(app, session) {
    return new Promise((resolve, reject) => {
        var target_symbol;
        supertest(app)
            .get('/api/all_symbols')
            .then((res) => {
                target_symbol = res.body.data[0];
                return supertest(app)
                    .post('/symbols/delete/' + target_symbol._id)
                    .set('Cookie', session)
            })
            .then((res) => {
                return supertest(app)
                    .get('/api/all_symbols');
            })
            .then((res) => {
                var result = {
                    image: target_symbol.file,
                    response: res.body
                };
                resolve(result);
            });
    });
}

exports.getSymbols = getSymbols;
exports.createSymbols = createSymbols;
exports.editNameSymbols = editNameSymbols;
exports.editFileSymbols = editFileSymbols;
exports.deleteSymbols = deleteSymbols;