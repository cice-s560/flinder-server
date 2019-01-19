const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../../models/User");

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ "auth.social.google.id": profile.id }).exec();

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
                    city: "-empty-",
                    country: "Spain"
                },
                auth: {
                    pass: `social${Date.now()}`,
                    social: {
                        google: {
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