var express = require("express");
var router = express.Router();
const UserModel = require("../models/User");
const hashedPassword = require("../lib/hashedpasswords");
const tokenGenerator = require("../lib/tokengenerator");
const passport = require("passport");
const localStrategy = require("../lib/strategies/local");
const NetflixStrategy = require("../lib/strategies/netflix");
const TwitterStrategy = require("../lib/strategies/twitter");


// passport
passport.use(localStrategy);
passport.use(NetflixStrategy);
passport.use(TwitterStrategy);

//Twitter lo requiere
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



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

  user.auth.password = await hashedPassword(req.body.password);

  await user.save().catch(err => {
    return res.status(500).send({ Error: err });
  });

  return res.status(201).send("created successfully");
});


router.post("/", passport.authenticate("local", { session: false }), async function (req, res) {
  try {
    const token = await tokenGenerator(req.user);
    return res.status(200).json({ token });

} catch (err) {
    return res.status(500).json({ error: "No token " });
  }
});



router.get("/twitter/signin", passport.authenticate("twitter"));

router.get("/twitter/callback", passport.authenticate("twitter", {failureRedirect: '/' }), async (req, res) => {
  try {
    
    const token = await tokenGenerator(req.user);

    return res.redirect(`${process.env.CLIENT_AUTH_CALLBACK_URL}?token=${token}`);

  } catch (err) {
    return res.redirect(process.env.CLIENT_AUTH_CALLBACK_FAILS);
  }
})


module.exports = router;