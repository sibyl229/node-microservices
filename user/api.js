var express = require('express');
var bodyParser = require('body-parser');
var validateJwt = require('./auth').validateJwt;
var model =  require('./models/mock');

var router = express.Router();

router.use(validateJwt);

router.use( bodyParser.json() );       // to support JSON-encoded bodies

router.get('/user', function(req, res) {
  const userId = req.userId;
  console.log(`user ${userId} called`);
  model.getUser(userId).then(
    (user) => {
      console.log(`got user ${userId} `);
      res.json(user);
    }
  ).catch((error) => {
    console.log('in /user');
    console.log(error);
    res.status(401).end();
  });
});

router.post('/user/bookmarks', function(req, res) {
  const userId = req.userId;
  model.getUser(userId).then(
    (user) => {
      model.addBookmark(userId, req.body.bookmark)
      res.json(user);
    }
  ).catch((error) => {
    res.status(401).end();
  });
});



module.exports = {
  router: router
};
