const express = require("express");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/User");
const {
  registerValidations,
  loginValidations,
} = require("../validations/UserValidations");

const router = express.Router();

// <-----Operation 1: Register user----->
router.post("/register", async (req, res) => {
  //STEP 1: validating user input
  const { error } = registerValidations(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: "invalid input", message: error.details[0].message });
  }
  try {
    //STEP 2: check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: "invalid input", message: "User already exists." });
    }

    //STEP 3: encrypting the password
    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    //STEP 4: registring the user
    const user = new User({ ...req.body, password: hashedPassword });
    const savedUser = await user.save();

    //STEP 5: sending back the user details with the appropriate messgae
    return res.send({ status: "success", username: savedUser.username });
  } catch (e) {
    res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 2: Login user----->
router.post("/login", async (req, res) => {
  //STEP 1: validating user input
  const { error } = loginValidations(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: "invalid input", message: error.details[0].message });
  }
  try {
    //STEP 2: check if user exists
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.status(400).send({
        status: "invalid input",
        message: "User does not exist.",
      });
    }

    //STEP 3: to check user password
    const passwordIsValid = await bcryptjs.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordIsValid) {
      return res
        .status(400)
        .send({ status: "invalid input", message: "Password is incorrect." });
    }

    //STEP 4: generating auth token and sending it back
    const token = jsonwebtoken.sign(
      { _id: userExists._id },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).send({
      status: "success",
      username: userExists.username,
      "auth-token": token,
    });
  } catch (e) {
    res.status(400).send({ status: "error", message: e.message });
  }
});

module.exports = router;
