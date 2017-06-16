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
      if (user) {
        console.log(`got user  `);
        res.json(user);
      } else {
        res.status(404).end();
      }
    }
  );
});

module.exports = {
  router: router
};
