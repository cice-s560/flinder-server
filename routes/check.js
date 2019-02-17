var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const checkToken = require("../lib/checktkn");


router.get('/', checkToken, (req, res, next) => {
    return res.json({username: req.user.username});
=======

async function checkSession(req, res, next) {
    if (req.session && req.session.user) {
        next();
    }
    
    return res.status(401).send();
}

router.get('/', checkSession, (req, res, next) => {
    return res.json({userId: req.session.user});
>>>>>>> d76d084300729185a092b9bcdc82cae7ba022965
})

module.exports = router;