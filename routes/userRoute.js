const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");
const { generateJwt } = require("../middlewares/generateJwt");

// POST
//signup
router.post("/signup", async (req, res) => {
  const testEmail = await User.findOne({ email: req.body.email });
  if (testEmail) {
    return res
      .status(500)
      .json({ message: "There is a user with that email already" }); // in a real application put "Server error" instead of this.
  }
  const userToCreate = await new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    userToCreate.password = bcrypt.hashSync(req.body.password, salt);
    // 201 successful
    userToCreate.save();
    return res.status(201).json(userToCreate);
  } catch (error) {
    //500 - Server error
    return res.status(500).json({ message: "couldn't create user" });
  }
});

/* login
-check that email exists
-if that check passes then we are going to check that the req.body.password matches user.password
-if that passes then we return a json web token (a soup of letters)
*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userToLogin = await User.findOne({ email });
  if (!userToLogin) {
    return res
      .status(400)
      .json({ message: "User with that email doesn't exists" }); // in production => "Wrong credentials", this is more secure
  }

  const validPassword = bcrypt.compareSync(password, userToLogin.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Password is incorrect" }); // in production => "Wrong credentials"
  }
  const token = await generateJwt(userExists._id);
  return res.json({ user: userToLogin, token });
});

module.exports = router;
