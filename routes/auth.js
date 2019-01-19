var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/////////////////////////////////////////////////////////////
///// PASSPORT
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   UserModel.findById(id, function(err, user) {
//     done(err, user._id);
//   });
// });
passport.use(
  new LocalStrategy(function(username, password, done) {
    UserModel.findOne({ "info.username": username }, async function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isMatchingPassword = await validateUserPassword(
        user.auth.pass,
        password
      );

      if (!isMatchingPassword) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, { id: user._id, username: user.info.username });
    });
  })
);

/////////////////////////////////////////////////////////////
////// UTILIDADES

function bcryptCompare(req, res, userdb) {
  bcrypt.compare(req.body.pass.toString(), userdb.auth.pass, (err, result) => {
    if (err) {
      throw err;
    }

    if (result) {
      req.session.user = userdb._id;
    }

    res.status(200).send("Login successful");
  });
}

async function mongoFind(req, res) {
  const filters = {
    "info.username": req.body.username
  };
  const users = await UserModel.find(filters).catch(err =>
    res.status(400).send("Error on user")
  );
  if (users === null) res.status(404).send("User not found");
  bcryptCompare(req, res, users);
}

async function mongoFindOne(req, res) {
  const filters = {
    "info.username": req.body.username
  };

  const users = await UserModel.findOne(filters).catch(err =>
    res.status(400).send("Error on user")
  );
  if (users === null) res.status(404).send("User not found");
  bcryptCompare(req, res, users);
}

async function createHashedPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password.toString(), 10, (err, hash) => {
      if (err) {
        reject(err);
        throw err;
      }

      return resolve(hash);
    });
  });
}

async function validateUserPassword(userPassword, password) {
  //   return new Promise((resolve, reject) => {
  //     return bcrypt.compare(password, userPassword);
  //   });
  return bcrypt.compare(password, userPassword);
}

/////////////////////////////////////////////////////////////
////// RUTAS

router.post("/signup", async (req, res) => {
  const user = new UserModel({
    info: {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      birthday: req.body.birthday,
      city: req.body.city,
      country: req.body.country,
      gender: req.body.gender
    }
  });

  user.auth.pass = await createHashedPassword(req.body.password);

  await user.save().catch(err => {
    throw err;
    return res.status(500).send();
  });

  return res.status(201).send("created successfully");
});

router.post("/", passport.authenticate("local", {session: false}), async function(req, res) {
  // Creo el token con un payload que representa el obj que Passport me da al autorizar
  jwt.sign(req.user, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      return res.status(500).json({error: "JWT Fails"});
    }

    return res.status(200).json({token});
  });

});

module.exports = router;
