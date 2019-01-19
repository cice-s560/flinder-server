const UserModel = require("../../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

async function validateUserPassword(userPassword, password) {
    return bcrypt.compare(password, userPassword);
}

module.exports = new LocalStrategy(function (username, password, done) {
    UserModel.findOne({ "info.username": username }, async function (err, user) {
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