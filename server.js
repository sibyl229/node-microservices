const express = require('express');
const app = express();
const path = require('path');
const userAuth = require('./user/auth').router;
const userApi = require('./user/api').router;
const cookieSession = require('cookie-session');
const uuidV4 = require('uuid/v4');

app.set('port', (process.env.PORT || 3001));

app.use(cookieSession({
  name: 'session',
  secret: 'TODO move the secret to a config file'
}));

app.use(function (req, res, next) {
  if (!req.session.uuid) {
    req.session.uuid = uuidV4();  // need a fairly unique and unpredictable id
  }
  next();
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/auth', userAuth);

app.use('/api', userApi);

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.listen(app.get('port'), function() {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
