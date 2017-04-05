var expect = require('chai').expect;

var start = require('../app/main');

var connect = require('./tests/connect');
var login = require('./tests/login');

var app = start(true);

it('Connect', () => {
    return connect(app).then((data) => {
        expect(data).to.be.false;
    })
});

it('Login', () => {
    return login(app).then((data) => {
        expect(data).to.be.true;
    })
});