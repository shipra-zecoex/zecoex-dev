var express = require('express');
var router = express.Router();

/* GET signUp page. */
router.get('/', function(req, res, next) {
    res.render('signUp.html');
});

module.exports = router;