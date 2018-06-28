var express = require('express');
var router = express.Router();

/* GET forget password page. */
router.get('/', function(req, res, next) {
    res.render('forgetPassword.html');
});

module.exports = router;