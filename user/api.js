var express = require('express');
var validateJwt = require('./auth').validateJwt;
var model =  require('./models/mock');

var router = express.Router();

router.use(validateJwt);

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

module.exports = {
  router: router
};
