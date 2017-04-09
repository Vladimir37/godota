var chai = require('chai');
var chaiFiles = require('chai-files');

var start = require('../app/main');

var connect = require('./tests/connect');
var auth = require('./tests/login');
var twitch = require('./tests/twitch');
var youtube = require('./tests/youtube');
var news = require('./tests/news');
var symbols = require('./tests/symbols');

var clean_db = require('./server/clean_db');

chai.use(chaiFiles);

var app = start(true);

var expect = chai.expect;
var file = chaiFiles.file;

var session;

var path = 'app/client/source/img/';

it('Connect', () => {
    return connect(app).then((data) => {
        expect(data).to.be.false;
    })
});

it('Login', () => {
    return auth.login(app).then((data) => {
        session = data.session;
        expect(data.logged).to.be.true;
    })
});

describe('Twitch', () => {
    it('Get Twitch', () => {
        return twitch.getTwitch(app).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.instanceof(Array);
            expect(data.data).to.be.empty;
        });
    });

    it('Creating', () => {
        return twitch.createTwitch(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.id).to.be.equal('test');
            expect(target_news.nickname).to.be.equal('TestCommand');
            expect(target_news.country).to.be.equal('Italy');
        });
    });

    it('Edining', () => {
        return twitch.editTwitch(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.id).to.be.equal('test_updated');
            expect(target_news.nickname).to.be.equal('TestCommandNew');
            expect(target_news.country).to.be.equal('Israel');
        });
    });

    it('Deleting', () => {
        return twitch.deleteTwitch(app, session).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.empty;
        });
    });
});

describe('Youtube', () => {
    it('Get Youtube', () => {
        return youtube.getYoutube(app).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.instanceof(Array);
            expect(data.data).to.be.empty;
        });
    });

    it('Creating', () => {
        return youtube.createYoutube(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.id).to.be.equal('test');
            expect(target_news.name).to.be.equal('TestCommand');
            expect(target_news.title).to.be.equal('FirstTitle');
        });
    });

    it('Edining', () => {
        return youtube.editYoutube(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.id).to.be.equal('test_updated');
            expect(target_news.name).to.be.equal('TestCommandNew');
            expect(target_news.title).to.be.equal('SecondTitle');
        });
    });

    it('Deleting', () => {
        return youtube.deleteYoutube(app, session).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.empty;
        });
    });
});

describe('News', () => {
    it('Get news', () => {
        return news.getNews(app).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.instanceof(Array);
            expect(data.data).to.be.empty;
        });
    });

    it('Creating', () => {
        return news.createNews(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.title).to.be.equal('Test news');
            expect(target_news.body).to.be.equal('TextTextText');
            expect(target_news.tags).to.be.instanceof(Array);
            expect(target_news.tags).to.include('one');
            expect(target_news.tags).to.include('three');
            expect(target_news.tags.length).to.be.equal(3);
            expect(target_news.mainImage).to.exist;
            expect(target_news.galleryExist).to.exist;
            expect(target_news.galleryList).to.be.instanceof(Array);
            expect(target_news.galleryList.length).to.be.equal(1);
            expect(file(path + 'main_images/' + target_news.mainImage)).to.exist;
            expect(file(path + 'gallery/' + target_news.galleryList[0])).to.exist;
        });
    });

    it('Editing content', () => {
        return news.editContentNews(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.title).to.be.equal('New test news');
            expect(target_news.body).to.be.equal('NewTextNewText');
            expect(target_news.tags).to.be.instanceof(Array);
            expect(target_news.tags).to.include('four');
            expect(target_news.tags).to.include('five');
            expect(target_news.tags.length).to.be.equal(3);
        });
    });

    it('Delete main image', () => {
        return news.deleteMainImageNews(app, session).then((data) => {
            var target_news = data.response.data[0];
            expect(data.response.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.mainImage).to.not.exist;
        });
    });

    it('Upload main image', () => {
        return news.changeMainImageNews(app, session, 3).then((data) => {
            var target_news = data.response.data[0];
            expect(data.response.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.mainImage).to.exist;
            expect(file(path + 'main_images/' + target_news.mainImage)).to.exist;
        });
    });

    it('Replace main image', () => {
        return news.changeMainImageNews(app, session, 4).then((data) => {
            var target_news = data.response.data[0];
            expect(data.response.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.mainImage).to.exist;
            expect(file(path + 'main_images/' + target_news.mainImage)).to.exist;
            expect(file(path + 'main_images/' + data.image)).to.not.exist;
        });
    });

    it('Delete gallery image', () => {
        return news.deleteGalleryImageNews(app, session).then((data) => {
            var target_news = data.response.data[0];
            expect(data.response.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.galleryExist).to.be.false;
            expect(target_news.galleryList).to.be.instanceof(Array);
            expect(target_news.galleryList).to.be.empty;
            expect(file(path + 'gallery/' + data.image)).to.not.exist;
        });
    });

    it('Creating gallery image', () => {
        return news.uploadGalleryImageNews(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.galleryExist).to.be.true;
            expect(target_news.galleryList).to.be.instanceof(Array);
            expect(target_news.galleryList.length).to.be.equal(1);
            expect(file(path + 'gallery/' + target_news.galleryList[0])).to.exist;
        });
    });

    it('Upload image to gallery', () => {
        return news.uploadGalleryImageNews(app, session).then((data) => {
            var target_news = data.data[0];
            expect(data.error).to.be.false;
            expect(target_news).to.exist;
            expect(target_news.galleryExist).to.be.true;
            expect(target_news.galleryList).to.be.instanceof(Array);
            expect(target_news.galleryList.length).to.be.equal(2);
            expect(target_news.galleryList[0]).to.not.be.equal(target_news.galleryList[1]);
            expect(target_news.galleryList[0]).to.be.ok;
            expect(target_news.galleryList[1]).to.be.ok;
        });
    });

    it('Delete news', () => {
        return news.deleteNews(app, session).then((data) => {
            // console.log(data.response.data);
            expect(data.response.error).to.be.false;
            expect(data.response.data).to.be.instanceof(Array);
            expect(data.response.data).to.be.empty;

            var target_news = data.news;
            expect(file(path + 'gallery/' + target_news.galleryList[0])).to.not.exist;
            expect(file(path + 'gallery/' + target_news.galleryList[2])).to.not.exist;
            expect(file(path + 'main_images/' + target_news.mainImage)).to.not.exist;
        });
    });
});

describe('Symbols', () => {
    it('Get symbols', () => {
        return symbols.getSymbols(app).then((data) => {
            expect(data.error).to.be.false;
            expect(data.data).to.be.instanceof(Array);
            expect(data.data).to.be.empty;
        });
    });
    
    it('Creating', () => {
        return symbols.createSymbols(app, session).then((data) => {
            var target_symbol = data.data[0];
            expect(data.error).to.be.false;
            expect(target_symbol).to.exist;
            expect(target_symbol.name).to.be.equal('testsym');
            expect(file(path + 'symbols/' + target_symbol.file)).to.exist;
        });
    });

    it('Name editing', () => {
        return symbols.editNameSymbols(app, session).then((data) => {
            var target_symbol = data.data[0];
            expect(data.error).to.be.false;
            expect(target_symbol).to.exist;
            expect(target_symbol.name).to.be.equal('newsymname');
        });
    });

    it('File editing', () => {
        return symbols.editFileSymbols(app, session).then((data) => {
            var target_symbol = data.response.data[0];
            expect(data.response.error).to.be.false;
            expect(target_symbol).to.exist;
            expect(file(path + 'symbols/' + target_symbol.file)).to.exist;
            expect(file(path + 'symbols/' + data.image)).to.not.exist;
        });
    });

    it('Deleting', () => {
        return symbols.deleteSymbols(app, session).then((data) => {
            expect(data.response.error).to.be.false;
            expect(data.response.data).to.be.instanceof(Array);
            expect(data.response.data).to.be.empty;
            expect(file(path + 'symbols/' + data.image)).to.not.exist;
        });
    });
});

describe('Logout', () => {
    it('Logout', () => {
        return auth.logout(app, session).then((data) => {
            expect(data.first).to.be.true;
            expect(data.second).to.be.false;        
        });
    });
});

after(clean_db)