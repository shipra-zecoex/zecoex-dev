var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session =require('express-session');

var config = require('./config/config');

var indexRouter = require('./routes/index');
var signInRouter = require('./routes/signIn');
var signUpRouter = require('./routes/signUp');
var forgetPasswordRouter = require('./routes/forgetPassword');
var dashboardRouter = require('./routes/dashboard');
var logoutRouter = require('./routes/logout');

var app = express();
app.use(express.static(path.join(__dirname, 'views')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


console.log('Use of express session middleware.');
app.use(session({
    key: "zecoex",
    secret: config.session.secret,
    store: app.get('sessionStore'),
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: null
    }
}));

console.log('Use of passport middleware.');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/users/forgot_password', forgetPasswordRouter);
app.use('/users/dashboard', dashboardRouter);
app.use('/users/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
