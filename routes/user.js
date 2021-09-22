const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

//create
router.post("/signup", async (req, res) => {
  const testEmail = await User.findOne({ email: req.body.email });
  if (testEmail) {
    return res.status(500).json({ message: "Email Error" });
  }
  const userToCreate = await new User(req.body);
  //userToCreate.save()
  try {
    const salt = bycrypt.genSaltSync();
    userToCreate.password = bycrypt.hashSync(req.body.password, salt);
    //200 ok/sucessful
    return res.status(201).json(userToCreate);
  } catch (error) {
    //500 - Server Error
    return res.status(500).json({ message: "Couldnt create user" });
  }
});

module.exports = router;
