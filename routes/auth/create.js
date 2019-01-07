var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const usersApiAccess = require('../../models/auth/UserApiAccess');


router.post('/', (req, res, next) => {
    const user = new usersApiAccess({
        user: req.body.user
    });    
    
    bcrypt.hash(req.body.pass.toString(), 10, async (err, hash) => {
        if (err) {
            throw err;
        }

        user.pass = hash;

        await user.save().catch(err => {
            throw err;
            return res.status(500).send();
        });

        return res.status(201).send('created successfully');
    })
})

module.exports = router;