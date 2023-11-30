const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");
const User = require("../models/User");

// <-----Operation 1: Add a post----->
router.post("/", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.headers.userid.toString());
  const userToPost = new User({
    username: "imsaz",
    email: "imsa@gmail.com",
    password: "helloimsa",
  });
  const savedUser = await userToPost.save();
  console.log(savedUser);

});

// <-----Operation 2: Get all posts----->
router.get("/", (req, res) => {});
// <-----Operation 3: Get a post----->
router.get("/:postid", (req, res) => {});

// <-----Operation 4: Update a post----->
router.patch("/:postid", (req, res) => {});

// <-----Operation 5: Delete a post----->
router.delete("/:postid", (req, res) => {});

module.exports = router;
