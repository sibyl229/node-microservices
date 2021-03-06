const os = require('os');
const path = require('path');
const fs = require('fs');
const google = require('googleapis');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var model =  require('./models/mock');

const clientSecretPath = path.join(os.homedir(), 'dev-credentials/client_secret_test.json');
const clientSecret = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8')).web;
console.log(clientSecret);

const jwtPrivateKey = 'TODO: to make this private';

var OAuth2Client = google.auth.OAuth2;

var oauth2Client = new OAuth2Client(
  clientSecret.client_id,
  clientSecret.client_secret,
  clientSecret.redirect_uris[0]
);

var scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

router.get('/', function (req, res) {
  const consentPageURL = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,

    // Optional property that passes state parameters to redirect URI
    // state: { foo: 'bar' }
    state: req.session.uuid
  });

  res.redirect(consentPageURL);
});

router.get('/oauth2callback', function (req, res) {
  // check CSFR
  if (req.query.state === req.session.uuid) {
    oauth2Client.getToken(req.query.code, function (err, tokens) {
      // Now tokens contains an access_token and an optional refresh_token. Save them.
      if (!err) {
        oauth2Client.setCredentials(tokens);
        google.oauth2('v2').userinfo.get({ auth: oauth2Client }, function (err, profile) {
          if (err) {
            res.status(401).send(err);
          } else if (!profile.verified_email) {
            res.status(401).send('Unverified google email');
          } else {
            model.createUser({
              email: profile.email,
              name: profile.name
            }).then((user) => {
              console.log('createUser success');
              console.log(profile);
              console.log(req.session.redirectTo);
              // look for user and create one if not exist
              // create jwt with user id
              const token = jwt.sign({ userId: user.id }, jwtPrivateKey, {
                algorithm: 'HS256',
                expiresIn: '7d'
              });

              // write cookie
              res.cookie('JWT', token, { maxAge: 86400 * 1000 }).redirect('http://localhost:3004/authCallback');
            })
          }
        });
      }
    });
  } else {
    res.status(401);
  }
});

function validateJwt(req, res, next) {
  const authorization = req.get('Authorization');

  if (authorization) {
    var myRegexp = /^Bearer\s+(.+)$/g;
    var match = myRegexp.exec(authorization);
    if (match) {
      const token = match[1];
      jwt.verify(token, jwtPrivateKey, (error, decodedToken) => {
        if (error) {
          res.status(401).send({
            error: error
          });
        } else {
          // check if user exist before continue
          const userId = decodedToken.userId;
          model.getUser(userId).then(
            (user) => {
              req.userId = userId;
              next();
            }
          ).catch((error) => {
            res.status(401).send({
              error: 'user does not exist'
            });
          });
        }
      });
    } else {
      res.status(401).send({
        error: 'no JWT token found'
      });
    }

  }
}


module.exports = {
  router: router,
  validateJwt: validateJwt
};




//http://localhost:3003/api/auth/oauth2callback
