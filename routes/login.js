var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/User');


function bcryptCompare(req, res, userdb) {

    bcrypt.compare(req.body.pass.toString(), userdb.auth.pass, (err, result) => {
        if (err) { 
            throw err;
        }

        if(result) {
            req.session.user = userdb._id;
        }

        res.status(200).send('Login successful');
    }) 
}

async function mongoFind(req, res) {

    const filters = {
        "info.username": req.body.username
    }
    const users = await userModel.find(filters).catch(err => res.status(400).send('Error on user'));
    if(users === null) res.status(404).send('User not found');
    bcryptCompare(req, res, users);
}

async function mongoFindOne(req, res) {

    const filters = {
        "info.username": req.body.username
    }

    const users = await userModel.findOne(filters).catch(err => res.status(400).send('Error on user'));
    if(users === null) res.status(404).send('User not found');
    bcryptCompare(req, res, users);
}




router.post('/', async function(req, res, next) {

    if(!req.body.username.toString().trim()) {return res.status(400);}
    if(!req.body.pass.toString().trim()) {return res.status(400);}

    mongoFindOne(req, res);
    //mongoFind(req, res);


});

module.exports = router;