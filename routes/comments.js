const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");
const Post = require("../models/Post");
const checkExpiry = require("../middlewares/checkExpiry");

// <-----Operation 1: Get all comments for a post with postid----->
router.get("/:postid", verifyToken, async (req, res) => {
  try {
    //STEP1: find the post, populate the author field for comments
    const comments = await Post.findById(req.params.postid, "comments")
      .populate("comments.author", "username")
      .limit(10);

    //STEP2: send back the comments with the appropriate status
    res.send({ status: "success", comments: comments });
  } catch (e) {
    res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 2: Add a comment for a post----->
router.post("/:postid", verifyToken, checkExpiry, async (req, res) => {
  try {
    if (!req.body.body || req.body.body.length == 0) {
      return res
        .status(400)
        .send({ status: "invalid input", message: "Comment can not be empty" });
    }
    const comment = {
      body: req.body.body,
      author: new mongoose.Types.ObjectId(req.user._id),
    };
    const updatedpost = await Post.findById(req.params.postid);
    updatedpost.comments.push(comment);
    await updatedpost.save();

    const populatedPosts = await updatedpost.populate(
      "comments.author",
      "username"
    );

    return res.send({ status: "success", comments: populatedPosts.comments });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

module.exports = router;
