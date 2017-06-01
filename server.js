const express = require('express');
const app = express();
var userAuth = require('./user/auth');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use('/api/auth', userAuth);

app.listen(app.get('port'), function() {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
