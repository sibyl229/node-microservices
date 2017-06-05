var express = require('express');
var validateJwt = require('./auth').validateJwt;
var router = express.Router();

router.use(validateJwt);

router.get('/user', function(req, res) {
  console.log('user called');
  res.json({
    userId: '1',
    email: 'aa@a.com'
  });
});

module.exports = {
  router: router
};
