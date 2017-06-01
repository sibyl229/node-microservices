const os = require('os');
const path = require('path');
const fs = require('fs');
const google = require('googleapis');
var express = require('express');
var router = express.Router();

const clientSecretPath = path.join(os.homedir(), 'dev-credentials/client_secret_test.json');
const clientSecret = JSON.parse(fs.readFileSync(clientSecretPath, 'utf8')).web;
console.log(clientSecret);

var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  clientSecret.client_id,
  clientSecret.client_secret,
  clientSecret.redirect_uris[1]
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
  });
  res.redirect(consentPageURL);
});
// define the about route
router.get('/oauth2callback', function (req, res) {
  res.send('About birds');
});

module.exports = router;




//http://localhost:3003/api/auth/oauth2callback
