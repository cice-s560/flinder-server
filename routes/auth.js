var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const passport = require("passport");
const localStrategy = require("../lib/strategies/local");


/////////////////////////////////////////////////////////////
///// PASSPORT
passport.use(localStrategy);


/////////////////////////////////////////////////////////////
////// UTILIDADES

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
