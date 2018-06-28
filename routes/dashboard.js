var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        var fullName = req.user.fullname;
        console.log('Full name : ' +fullName);
        res.render('dashboard.html', {'Fullname' : fullName});
    } else {
        res.redirect('/');
    }
});

module.exports = router;