require('dotenv').config();
const UserModel = require("../../models/User");
const NetflixStrategy = require("passport-netflix").Strategy;

module.exports = new NetflixStrategy({
    consumerKey: process.env.NETFLIX_API_KEY,
    consumerSecret: process.env.NETFLIX_API_SHARED_SECRET,
    callbackURL: process.env.NETFLIX_CALLBACKURL
  },
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ "auth.social.netflix.id": profile.id }).exec();

            if (user) {
                return done(null, { id: user._id, username: user.info.username });
            }

            const userModel = new User({
                info: {
                    username: profile.displayName,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    email: profile.emails[0].value,
                    birthday: new Date(),
                    city: "null",
                    country: "Spain"
                },
                auth: {
                    password: `generated${Date.now()}`,
                    social: {
                        netflix: {
                            id: profile.id
                        }
                    }
                }
            });

            const userSaved = await userModel.save();

            return done(null, { id: userSaved._id, username: userSaved.info.username });
        } catch (err) {
            return done(err, null);
        }
    }
  
);