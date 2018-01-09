var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session)

var index = require('./routes/index');
var users = require('./routes/userRoutes');
var posts = require('./routes/postRoutes');

var config = require("./config");

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// TODO remember to specify username and password in your configuration
mongoose.connect('mongodb://localhost/RestBlog', { useMongoClient: true }); 

var app = express();

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: true,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: { secure: false } //TODO in production change it to true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
