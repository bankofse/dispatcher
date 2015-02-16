var express = require('express');
var router = express.Router();
var transaction = require('./transaction');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({status: 200});
});

router.use('/transaction', transaction);

module.exports = router;
