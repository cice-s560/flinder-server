const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const usersRouter = require("./routes/users");
const usersAuth = require("./routes/auth");
const usersAuthCheck = require("./routes/check");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport necesita serializar el usuario
app.use(passport.initialize());

app.use("/users", usersRouter);
app.use("/auth", usersAuth);
app.use("/check", usersAuthCheck);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

module.exports = app;
