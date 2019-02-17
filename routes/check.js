var express = require('express');
var router = express.Router();


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