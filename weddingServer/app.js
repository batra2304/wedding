var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users_api');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');
var manageUsersRouter = require('./routes/manage_users');
var productsRouter = require('./routes/products');
var metRouter = require('./routes/met');
const bodyParser= require('body-parser');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var app = express();
app.use(fileUpload());
app.use(session({
  secret: 'anaskldfjskd',
  resave: false,
  saveUninitialized: true,
  cookie:{ 
    expires : new Date(Date.now() + 3600000),
    maxAge: 3600000 
  }
}))
app.use(bodyParser.urlencoded({extended: true}));
// view engine setup
app.use(cors({origin: 'http://localhost:4200'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users_api', usersRouter);
app.use('/met', metRouter);
app.use('/auth',authRouter);
app.use('/dashboard',dashboardRouter);
app.use('/manage_users',manageUsersRouter);
app.use('/products',productsRouter);

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
  res.render('error');
});

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  });


module.exports = app;
