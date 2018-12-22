const express = require('express');
const router = express.Router();
const UserModel = require("../models/User");

router.route('/')
  .get(async (req, res) => {
    const genderFilter = req.query.gender || /.*/;
    const usernameFilter = req.query.username || /.*/;
    const filters = {
      "info.gender": genderFilter,
      "info.username": usernameFilter
    }

    const users = await UserModel.find(filters).catch(err => res.status(400).json(err));

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
