const jsonwebtoken = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ message: "Access Denied!" });
  }
  try {
    const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ status: "unauthorized", message: "Invalid Token!" });
  }
};

module.exports = verifyToken;
