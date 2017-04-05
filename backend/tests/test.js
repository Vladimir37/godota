var assert = require('assert');

// var actions = require('./actions');
var login = require('./tests/login');

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

// before(actions.start);

// afterAll(actions.stop);

it('Login', () => {
    return login().then((data) => {
        assert.equal(data, true);
    })
});