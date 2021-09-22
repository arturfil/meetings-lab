const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const testEmail = await User.findOne({email: req.body.email});
  if (testEmail) {
    return res.status(500).json({message: "Email already exists"});
  }
  const userToCreate = await new User(req.body);
  try {
    //200 == ok/successful
    return res.status(201).json(userToCreate);
  } catch (error) {
    //500 server error
    return res.status(500).json({message: "Couldn't create user"});
  }
})

module.exports = router;