var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/User');

router.post('/', async function(req, res, next) {

    if(!req.body.username.toString().trim()) {return res.status(400);}
    if(!req.body.pass.toString().trim()) {return res.status(400);}

    // Si en vez de username: req.... mandamos el objeto vacío, funciona
    userModel.findOne({username: req.body.username.toString()}, function (err, userdb) {

        if(userdb === null) {
            console.log('Not found');
            return res.status(404).send('Error on user');
        };

        if (err) return handleError(err);

        console.log(req.body.username);
        console.log(typeof req.body.username); 
        console.log(userdb);
    
        bcrypt.compare(req.body.pass.toString(), userdb.auth.pass, (err, result) => {
            if (err) {
                throw err;
            }
    
            if(result) {
                req.session.user = userdb._id;
            }
    
            res.status(200).send('Login successful');
        })

      });

});

module.exports = router;