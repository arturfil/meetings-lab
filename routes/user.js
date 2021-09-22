const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const User = require("../models/User");
const { generateJwt } = require("../middlewares/generateJwt");

router.post("/signup", async (req, res) => {
  const testEmail = await User.findOne({ email: req.body.email });
  if (testEmail) {
    return res
      .status(500)
      .json({ message: "Server error (Email exists already)❌" });
  }
  try {
    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.json(user);
  } catch (error) {
    return res.json({ message: `Error: ${error}` });
  }
});

/*Login
- Check that emails exists 
- If that check passes
  - Check that the req.body.password === User.password
  - If that passes then we return a JWT (a soup of letters)
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userToLogin = await User.findOne({ email });
  if (!userToLogin) {
    return res
      .status(400)
      .json({ message: "Wrong Credentials (User doesn't exist)." });
  }

  const validPassword = bcrypt.compareSync(password, userToLogin.password);
  if (!validPassword) {
    return res
      .status(500)
      .json({ message: "Wrong Credentials (Password is incorrect)" });
  }

  const token = await generateJwt(userToLogin._id);
  return res.json({ user: userToLogin, token });
});

module.exports = router;
