const express = require('express');
const router = express.Router();
const UserModel = require("../models/User");


function checkSession(req, res, next) {
  if (req.session && req.session.user) {
      next();
  }
  
  return res.status(401).send('Login required');
}

router.route('/')
  .get(async (req, res, next) => {

      checkSession(req, res, next);

      const genderFilter = req.query.gender || /.*/;
      const usernameFilter = req.query.username || /.*/;
      const filters = {
        "info.gender": genderFilter,
        "info.username": usernameFilter
      }

      const users = await UserModel.find(filters).catch(err => res.status(400).json(err));

      if (!users) return res.status(404).send('User not found');

      return res.status(200).json(users);
    

  })


  .post(async (req, res) => {
      
      const user = new UserModel(req.body);
      const userCreated = await user.save().catch(err => {
        // ...validate error
        res.status(400).json({ error: err });
      });

      res.status(201).json(userCreated);

  });

module.exports = router;
