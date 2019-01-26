const GithubStrategy = require('passport-github').Strategy;
const User = require("../../models/User");

module.exports = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ "auth.social.github.id": profile.id }).exec();
            if (user) {
                return done(null, { id: user._id, username: user.info.username });
            }
            
            const userModel = new User({
                info: {
                    username: profile.username,
                    firstname: '-empty-',
                    lastname: '-empty-',
                    email: profile._json.email || 'noemail@email.com',
                    birthday: new Date(),
                    city: "-empty-",
                    country: "Spain"
                },
                auth: {
                    pass: `social${Date.now()}`,
                    social: {
                        github: {
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