const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/userModel");
const { generateJwt } = require("../middlewares/generateJwt");

router.post("/signup", async (req, res) => {
  const testEmail = await User.findOne({ email: req.body.email });
  if (testEmail) {
    return res.status(500).json({ message: "Server Error" });
  }
  const userToCreate = await new User(req.body);

  try {
    const salt = bcrypt.genSaltSync();
    userToCreate.password = bcrypt.hashSync(req.body.password, salt);

    userToCreate.save();

    return res.status(201).json(userToCreate);
  } catch (error) {
    return res.status(500).json({ message: "couldnt create user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) return res.status(400).json({ message: "Error" });

  const validPassword = bcrypt.compareSync(password, userExists.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
  const token = await generateJwt(userToLogin._id);
  return res.json({ user: userToLogin, token });
});

module.exports = router;
