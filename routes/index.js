var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/users/dashboard');
    } else {
        res.render('signIn.html', {
            errorMessage : '',
            succMessage: '',
            userId : ''
        });
    }
});

module.exports = router;
