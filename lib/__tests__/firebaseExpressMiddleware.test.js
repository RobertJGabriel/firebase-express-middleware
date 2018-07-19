const firebaseMw = require('../index');
process.env.APP_DEBUG = 'true';

describe('Firebase middleware working', () => {
  it('Ensure the auth is working', () => {
    return expect(firebaseMw.auth()).toEqual('test');
  });
});
