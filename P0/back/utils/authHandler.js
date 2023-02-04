const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

exports.hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

exports.comparePassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
