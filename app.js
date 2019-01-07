const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const app = express();

const usersRouter = require("./routes/users");
const usersAuthLogin = require("./routes/auth/login");
const usersAuthCreate = require("./routes/auth/create");
const usersAuthCheck = require("./routes/auth/check");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'authenticator custom',
  resave: false,
  saveUninitialized: true
}))

app.use('/users', usersRouter);
app.use('/login', usersAuthLogin);
app.use('/create', usersAuthCreate);
app.use('/check', usersAuthCheck);


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
  res.json({
    error: err
  });
});

module.exports = app;
