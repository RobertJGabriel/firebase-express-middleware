const admin = require.main.require('firebase-admin');
const logger = require('./util/logger');

/**
 * Function for handling middleware.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
function firebaseAuthMiddleware(req, res, next) {
  const authorization = req.header('Authorization');
  if (authorization) {
    let firebaseToken = authorization.split(' ');
    admin
      .auth()
      .verifyIdToken(firebaseToken[1])
      .then(decodedToken => {
        logger.log(decodedToken);
        res.locals.user = decodedToken;
        next();
      })
      .catch(err => {
        logger.log(err);
        // Response a 401 with a json api respons
        res.json(401, {
          accessDenied: true,
          message: 'Full authentication is required to access this resource.',
          cause: 'NOT AUTHENTICATED'
        });
      });
  } else {
    logger.log('Authorization header is not found');
    res.json(401, {
      accessDenied: true,
      message: 'Full authentication is required to access this resource.',
      cause: 'NOT AUTHENTICATED'
    });
  }
}

module.exports = firebaseAuthMiddleware;
