var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session)

var index = require('./routes/index');
var users = require('./routes/userRoutes');
var posts = require('./routes/postRoutes');
var login = require('./routes/loginRoutes');

var config = require("./config");

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/';
console.log('Connecting to database at ' + mongoUrl);
// TODO remember to specify username and password in your configuration
mongoose.connect(mongoUrl+'RestBlog', { useMongoClient: true }); 

var app = express();

app.set('trust proxy', 1); // trust first proxy

app.use(cookieParser());
app.use(session({
    secret: config.cookieSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      db: 'sessions', 
      ttl: 60 * 60 * 24 * 365,
      touchAfter: 60 * 60 * 24,
      mongooseConnection: mongoose.connection
    }),
    cookie: { 
      secure: false, // false or it needs HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 365,
     } 
}));

var originsWhitelist = [
  'http://localhost:4200', //this is my front-end url for development
  'http://localhost:8080', //this is my front-end url for development (from docker)
  'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/login', login);

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
