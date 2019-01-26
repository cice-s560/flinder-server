const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../../models/User");

module.exports = new SpotifyStrategy(
  {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CLIENT_CALLBACK
  },
  async function(accessToken, refreshToken, expires_in, profile, done) {
    try {
      const user = await User.findOne({
        "auth.social.spotify.id": profile.id
      }).exec();

      if (!user) {
        return done(null, { id: user._id, username: user.info.username });
      }

      const userModel = new User({
        info: {
          username: profile.displayName,
          firstname: "-empty-",
          lastname: "-empty-",
          email: profile.emails[0].value,
          birthday: new Date(),
          city: "-empty-",
          country: profile.country
        },
        auth: {
          pass: `social${Date.now()}`,
          social: {
            spotify: {
              id: profile.id
            }
          }
        }
      });

      const newUser = await userModel.save();

      return done(null, {
        id: newUser._id,
        username: newUser.info.username
      });
    } catch (err) {
      return done(err, null);
    }
  }
);
