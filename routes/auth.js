var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const passport = require("passport");
const localStrategy = require("../lib/strategies/local");
const googleStrategy = require("../lib/strategies/google");
const spotifyStrategy = require("../lib/strategies/spotify");
const githubStrategy = require("../lib/strategies/github");

/////////////////////////////////////////////////////////////
///// PASSPORT
passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(spotifyStrategy);
passport.use(githubStrategy);

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

function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        return reject(err);
      }

      return resolve(token);
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
    return res.status(500).send({ Error: err });
  });

  return res.status(201).send("created successfully");
});

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  async function(req, res) {
    // Creo el token con un payload que representa el obj que Passport me da al autorizar
    try {
      const token = await generateJWT(req.user);

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ error: "JWT Fails" });
    }
  }
);

router.get(
  "/signin/google",
  passport.authorize("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const token = await generateJWT(req.user);

      return res.redirect(
        `${process.env.CLIENT_AUTH_CALLBACK_URL}?token=${token}`
      );
    } catch (err) {
      return res.redirect(process.env.CLIENT_AUTH_CALLBACK_FAILS);
    }
  }
);

router.get(
  "/signin/spotify",
  passport.authorize("spotify", {
    scope: ["user-read-private", " user-read-email"]
  })
);

router.get(
  "/callback/spotify",
  passport.authenticate("spotify", { session: false }),
  async (req, res) => {
    try {
      const token = await generateJWT(req.user);
      return res.redirect(
        `${process.env.CLIENT_AUTH_CALLBACK_URL}?token=${token}`
      );
    } catch (err) {
      return res.redirect(process.env.CLIENT_AUTH_CALLBACK_FAILS);
    }
});

router.get("/signin/github", passport.authorize("github", { scope: ["email", "profile"] }));
router.get("/callback/github", passport.authenticate("github", { session: false }), async (req, res) => {
  try {
    const token = await generateJWT(req.user);
    return res.redirect(`${process.env.CLIENT_AUTH_CALLBACK_URL}?token=${token}`);
  } catch (err) {
    return res.redirect(process.env.CLIENT_AUTH_CALLBACK_FAILS);
  }
})

router.get("/signin/google", passport.authorize("google", { scope: ["email", "profile"] }));

router.get("/callback/google", passport.authenticate("google", { session: false }), async (req, res) => {
  try {
    const token = await generateJWT(req.user);

    return res.redirect(`${process.env.CLIENT_AUTH_CALLBACK_URL}?token=${token}`);
  } catch (err) {
    return res.redirect(process.env.CLIENT_AUTH_CALLBACK_FAILS);
  }
);

module.exports = router;
