const GithubStrategy = require('passport-github').Strategy;
const User = require("../../models/User");
const axios = require("axios");

module.exports = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_CALLBACK
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const request = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `Bearer ${ accessToken }` }
            }).catch(err => console.error(err));
            const user = await User.findOne({ "auth.social.github.id": profile.id }).exec();
            if (user) {
                return done(null, { id: user._id, username: user.info.username });
            }
            
            const userModel = new User({
                info: {
                    username: profile.username,
                    firstname: '-empty-',
                    lastname: '-empty-',
                    email: request.data[0].email || 'noemail@email.com',
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