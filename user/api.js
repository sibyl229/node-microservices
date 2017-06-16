var express = require('express');
var validateJwt = require('./auth').validateJwt;
var model =  require('./models/mock');

var router = express.Router();

router.use(validateJwt);

router.get('/user', function(req, res) {
  const userId = req.userId;
  console.log(`user ${userId} called`);
  model.getUser(userId, (data, error) => {
    console.log('callbakc is calledddd');
    res.json(data);
  });
});

module.exports = {
  router: router
};
