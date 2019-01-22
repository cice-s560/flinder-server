var express = require('express');
var router = express.Router();
const checkToken = require("../lib/checktkn");


router.get('/', checkToken, (req, res, next) => {
    return res.json({userId: req.user.id});
})

module.exports = router;