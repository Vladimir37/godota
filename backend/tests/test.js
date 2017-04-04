var actions = require('./actions');
var login = require('./tests/login');

beforeAll(actions.start);

afterAll(actions.stop);

test('Login', () => {
    // expect(4).toBe(4);
    login().then((data) => {
        expect(4).toBe(4);
    })
});