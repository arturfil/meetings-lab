const jwt = require("jsonwebtoken");

const generateJwt = (id) => {
  return newPromise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      data,
      "sdjkndsdfnjjndfjwownfjnfjkjknfjnkfsjnksjnkdfs",
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          reject("couldnt generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJwt,
};
