var expect = require('chai').expect;

var start = require('../app/main');

var connect = require('./tests/connect');
var login = require('./tests/login');
var twitch = require('./tests/twitch');
var youtube = require('./tests/youtube');
var news = require('./tests/news');

var clean_db = require('./server/clean_db');

var app = start(true);

var session;

it('Connect', () => {
    return connect(app).then((data) => {
        expect(data).to.be.false;
    })
});

it('Login', () => {
    return login(app).then((data) => {
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

    // TODO creating, deleting, editing
});

after(clean_db)