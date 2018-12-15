const express = require('express');
const router = express.Router();
const UserModel = require("../models/User");

router.route('/')
  .get((req, res) => {
    
  })
  .post(async (req, res) => {
    const user = new UserModel(req.body);
    const userCreated = await user.save().catch(err => {
      // ...validate error
      res.status(500).json({ error: err });
    });

    res.status(201).json(userCreated);
  });

module.exports = router;
