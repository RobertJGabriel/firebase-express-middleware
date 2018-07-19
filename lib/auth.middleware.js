const admin = require.main.require('firebase-admin');
const debugEnabled = process.env.APP_DEBUG || 'true';
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
        if (debugEnabled) {
          console.log(decodedToken);
        }
        res.locals.user = decodedToken;
        next();
      })
      .catch(err => {
        if (debugEnabled) {
          console.log(err);
        }
        // Response a 401 with a json api response
        res.json(401, {
          accessDenied: true,
          message: 'Full authentication is required to access this resource.',
          cause: 'NOT AUTHENTICATED'
        });
      });
  } else {
    if (debugEnabled) {
      console.log('Authorization header is not found');
    }
    res.json(401, {
      accessDenied: true,
      message: 'Full authentication is required to access this resource.',
      cause: 'NOT AUTHENTICATED'
    });
  }
}

module.exports = firebaseAuthMiddleware;
