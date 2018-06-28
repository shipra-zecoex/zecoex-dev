var express = require('express');
var router = express.Router();

/* GET SignIn page after logout. */
router.get('/', function(req, res, next) {
    req.session.cookie.maxAge = null;
    req.logout();
    req.session.destroy();
    res.render('signIn.html', {
        errorMessage : '',
        succMessage: 'You Are Logout Successfully',
        userId : ''
    });
});

module.exports = router;