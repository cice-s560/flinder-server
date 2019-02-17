var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');


router.post('/', (req, res, next) => {
    const user = new UserModel({
        prueba: req.body.prueba, 
        info: {
            username: req.body.info.username, 
            firstname: req.body.info.firstname, 
            lastname: req.body.info.lastname, 
            email: req.body.info.email,
            birthday: req.body.info.birthday,
            city: req.body.info.city,
            country: req.body.info.country,
            gender: req.body.info.gender,
         },
         auth: {
             pass: req.body.info.pass,
         }
    });    
    
    bcrypt.hash(req.body.auth.pass.toString(), 10, async (err, hash) => {
        if (err) {
            throw err;
        }

        user.auth.pass = hash;

        await user.save().catch(err => {
            throw err;
            return res.status(500).send();
        });

        return res.status(201).send('created successfully');
    })
})

module.exports = router;