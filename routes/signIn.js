var config = require('../config/config');
var db = require('../db');
var userServices = require('../services/userservices');

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var base64 = require('base-64');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();

//Declaration of all properties linked to the environment (beanstalk configuration)
var AWS_REGION = config.aws.cognito.awsRegion;
var AMAZON_CLIENT_ID = config.aws.cognito.awsClientId;
var COGNITO_USER_POOL_ID = config.aws.cognito.awsUserPoolId;

/* GET signIn page. */
router.get('/', function(req, res, next) {
    res.render('signIn.html', {
        errorMessage : '',
        succMessage: '',
        userId : ''
    });
});

var authenticate = passport.authenticate('local', {
    successRedirect : '/users/dashboard',
    failureRedirect : '/',
    failureFlash : false
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log("err : " + err);
            console.log("info : " + info);
        } else {
            if (!user) {
                console.log("err in user : " + err);
                console.log("info : " + info);
                req.session.cookie.maxAge = null;
                res.render('signIn.html', {
                    errorMessage : info.message,
                    succMessage: '',
                    userId : ''
                });
            } else {
                req.logIn(user, function (err) {
                    if (err) {
                        console.log("Error : error occurred in login");
                        next(err);
                    }
                    req.session.cookie.maxAge = config.session.rememberMeDuration;
                    res.redirect('/users/dashboard');
                });
            }
        }
    })(req, res, next);
});

passport.serializeUser(function(user, done) {
    console.log("User SERIALIZED... User : " + JSON.stringify(user));
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("User DESERIALIZED... User : " + JSON.stringify(user));
    done(null, user);
});


authenticateUserCredentials = function(username, password, verificationDone) {
        userFoundCallback = function(result) {
            if(!result.success) {
                log.error("ERROR while fetching username. ERROR : " + err);
                verificationDone(err);
            } else {
                if(result.userData) {
                    var user = result.userData[0];
                    var authenticationData = {
                        Username : username,
                        Password: password
                    };

                    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

                    var poolData = { UserPoolId : COGNITO_USER_POOL_ID,
                        ClientId : AMAZON_CLIENT_ID
                    };

                    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

                    var userData = {
                        Username : username,
                        Pool : userPool
                    };

                    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

                    cognitoUser.authenticateUser(authenticationDetails, {
                        onSuccess: function (result) {
                            var accessToken = result.getAccessToken().getJwtToken();

                            var idToken = result.idToken.jwtToken;
                            cognitoUser.getUserData(function (err, result) {
                                console.log('Cognito User Data : ' +JSON.stringify(result));
                            });

                            cognitoUser.getUserAttributes(function(err, result) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                for (i = 0; i < result.length; i++) {
                                    if (result[i].getName() == 'email_verified') {
                                        var emailStatus = result[i].getValue();
                                    } else if (result[i].getName() == 'phone_number_verified') {
                                        var mobileStatus = result[i].getValue();
                                    } else if (result[i].getName() == 'custom:password') {
                                        var cognitoPassword = result[i].getValue();
                                    }

                                    if (emailStatus && mobileStatus && cognitoPassword == password) {
                                        verificationDone(null, user);

                                    }
                                }
                            });
                        },

                        onFailure: function(err) {
                            verificationDone(null, null, {message: err.message});
                        },

                    });
                } else {
                    log.error("ERROR : INVALID USERNAME/PASSWORD");
                    var INVALID_CREDENTIALS_MSG = "The email or password you entered is incorrect";
                    log.error("ERROR : INVALID_CREDENTIALS_MSG: " + INVALID_CREDENTIALS_MSG);
                    verificationDone(null, null, {message: INVALID_CREDENTIALS_MSG});
                }
            }
        };
        userServices.findUser(username, userFoundCallback);
};

verify = function(req, username, password, verificationDone) {
    var password = base64.encode(req.body.password);
    authenticateUserCredentials(username, password, verificationDone);
};

passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'userid',
    passwordField: 'password'
},verify));

module.exports = router;