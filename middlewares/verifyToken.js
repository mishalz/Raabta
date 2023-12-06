const jsonwebtoken = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //STEP1: extract the auth-token from the header
  const token = req.header("auth-token");

  //STEP2: if there is no token, no access :)
  if (!token) {
    return res
      .status(401)
      .send({ status: "authorization error", message: "Access Denied!" });
  }
  try {
    //STEP3: verify the given token, if its valid
    const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    //STEP4: forward the request
    next();
  } catch (e) {
    return res
      .status(401)
      .send({ status: "authorization error", message: "Invalid Token!" });
  }
};

module.exports = verifyToken;
