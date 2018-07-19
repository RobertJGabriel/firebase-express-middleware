const logger = require('../util/logger');
process.env.APP_DEBUG = 'true';

describe('Test for logger to work', () => {
  it('Ensure the logger is working', () => {
    return expect(logger.log('test')).toEqual('test');
  });
});
