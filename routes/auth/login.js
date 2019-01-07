var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userApiAccess = require('../../models/auth/UserApiAccess');

router.post('/', async function(req, res, next) {

    if(!req.body.user.toString().trim()) {return res.status(400);}
    if(!req.body.pass.toString().trim()) {return res.status(400);}

    const userdb = await userApiAccess.findOne({user: req.body.user});

    bcrypt.compare(req.body.pass.toString(), userdb.pass, (err, result) => {
        if (err) {
            throw err;
        }

        if(result) {
            req.session.user = userdb._id;
        }

        res.status(200).send('Login successful');
    })

});

module.exports = router;