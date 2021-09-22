const jwt = require("jsonwebtoken");

const validateJwt = (req, res, callback) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ message: "token not found" });

  try {
    const { uid } = jwt.verify(
      token,
      "sdjkndsdfnjjndfjwownfjnfjkjknfjnkfsjnksjnkdfs"
    );
    req.uid = uid;
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
  callback();
};

module.exports = {
  validateJwt,
};
