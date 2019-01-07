const mongoose = require('mongoose');

const userApiAccess = new mongoose.Schema({
    user: { type: String, required: true, index: { unique: true } },
    pass: { type: String, required: true }
});

module.exports = new mongoose.model("UserApiAccess", userApiAccess, 'users_authentication');