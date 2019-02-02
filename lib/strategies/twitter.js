require('dotenv').config();
const TwitterStrategy = require("passport-twitter").Strategy;
const UserModel = require("../../models/User");
const hashedPassword = require("../../lib/hashedpasswords");

module.exports = new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACKURL
  },
    async function (accessToken, refreshToken, profile, done) {

        try {
            const user = await UserModel.findOne({ "auth.social.twitter.id": profile.id }).exec();

            if (user) {
                return done(null, { id: user._id, username: user.info.username });
            }
            const hashedpassword = hashedPassword(`generated${Date.now()}`);

            const twitterProfile = new UserModel({
                info: {
                    username: profile.username,
                    firstname: profile.displayName,
                    lastname: 'null',
                    email: 'notdefined@noemail.com',
                    birthday: new Date(),
                    city: "null",
                    country: "Spain"
                },
                auth: {
                    password: hashedpassword.toString(),
                    social: {
                        twitter: {
                            id: profile.id
                        }
                    }
                }
            })

            const userSaved = await twitterProfile.save();

            return done(null, { id: userSaved._id, username: userSaved.info.username });

        } catch (err) {
            return done(err, null);
        }
    }
  
);