var express = require('express');
var router = express.Router();

var dispatch = require('../dispatch');

// Fpr now single instance, later gernaric-pool
const dispatcher = new dispatch.TransactionDispatcher();

router.use('*', function (req, res, next) {
    req.dispatch = dispatcher
    next();
});

router.get('/', function(req, res, next) {

    req.dispatch.sendTransaction();

    res.status(200).send({
        status: 200,
        message: 'not much to see here'
    });
});

module.exports = router;
