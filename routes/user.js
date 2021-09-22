const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");

const { generateJwt } = require("./middlewares/generateJwt");

// POST - Sign up
router.post("/signup", async (req, res) => {
  const testEmail = await User.findOne({ email: req.body.email });

  if (testEmail) {
    return res.status(500).json({ message: "Email already exists" });
  }

  const userToCreate = await new User(req.body);

  try {
    const salt = bcrypt.genSaltSync();
    userToCreate.password = bcrypt.hashSync(req.body.password, salt);

    userToCreate.save();
    return res.status(201).json(userToCreate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userToLogin = await User.findOne({ email });

  if(!userToLogin){
    return res.status(400).json({message: "Incorrect username"})
  }


  const validPassword = bcrypt.compareSync(password, userToLogin.password)
  if (!validPassword){
    return res.status(500).json({message: "Incorrect password"})
  } 

  const token = await generateJwt(userToLogin._id)
  return res.json({user: userToLogin, token: token})

});

module.exports = router;
