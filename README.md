# Firebase Express Middleware [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  <span class="badge-patreon"><a href="https://www.patreon.com/robertjgabriel" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
> Express middleware that handles the firebase auth for API requests.

[![npm version](https://badge.fury.io/js/firebase-express-middleware.svg)](https://badge.fury.io/js/firebase-express-middleware)

> Starting new express firebase project? try out [Express Firebase](https://github.com/antonybudianto/firebase-express-middleware) starter

## Requirements

- Node 7 or higher
- Firebase account

## How to use

1. Install the package.

    ```sh
    npm install firebase-express-middleware --s --d
    ```

2. Require it in your express routes
  ```js
  const firebaseMW= require('firebase-express-middleware');

  router.use('/firebase', firebaseMW.auth);
  ```

3. Now make sure the client's requests have Authorization header. Example being
    ```
    Authorization: Bearer <your-client-token>
    ```

   You can get your token here (https://firebase.google.com/docs/auth/admin/verify-id-tokens) from the client SDK.

4. When requesting, and token is valid, you can get the `user` object from response
    ```js
    router.get('/api/example', (req, res) => {
        res.json({
            message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
        });
    });
    ```

    if it fails, you get the following 401 header and response.

    ```js
      {
        accessDenied: true,
        message: 'Full authentication is required to access this resource.',
        cause: 'NOT AUTHENTICATED'
      }

    ```

## Debug mode

By default, the middleware will log and output to console, you can disable them by setting
your environment variable for `DEBUG` to `false`

## License

MIT © [Robert James Gabriel](https://www.robertgabriel.ninja)


[npm-image]: https://badge.fury.io/js/firebase-express-middleware.svg
[npm-url]: https://npmjs.org/package/firebase-express-middleware
[travis-image]: https://travis-ci.org/RobertJGabriel/firebase-express-middleware.svg?branch=master
[travis-url]: https://travis-ci.org/RobertJGabriel/firebase-express-middleware
[daviddm-image]: https://david-dm.org/RobertJGabriel/firebase-express-middleware.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/RobertJGabriel/firebase-express-middleware
