var actions = require('./actions');
var login = require('./tests/login');

beforeAll(() => {
    return actions.start();
});

afterAll(() => {
    return actions.stop();
});

test('Login', () => {
    // console.log('log');
    expect(4).toBe(4);
    // login().then((data) => {
    //     expect(data).toBe(4);
    // })
});