var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const usersApiAccess = require('../../models/auth/UserApiAccess');

async function checkSession(req, res, next) {
    if (req.session && req.session.user) {
        next();
    }
    
    return res.status(401).send();
}

router.get('/', checkSession, (req, res, next) => {
    return res.json({userId: req.session.user});
})

module.exports = router;