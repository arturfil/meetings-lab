const jwt = require("jsonwebtoken");

generateJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      {name: 'Alfredo'},
      data,
      "ashlhdhalsdhasdjkas12huaisd1232213asdasas",
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject("Couldn't generate token");
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
