const express = require("express");
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const checkExpiry = require("../middlewares/checkExpiry");

const router = express.Router();

// <-----Operation 1: Get all comments for a post with postid----->
router.get("/:postid", verifyToken, async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.params.postid);
    //STEP1: find the post, select only the comments field, populate comments
    const comments = await Comment.find({ post: postId }).limit(10);
    console.log(comments);
    //STEP2: send back the comments with the appropriate status
    res.send({ status: "success", comments: comments });
  } catch (e) {
    res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 2: Add a comment for a post----->
router.post("/:postid", verifyToken, checkExpiry, async (req, res) => {
  try {
    //STEP1: applying validation on the user input (that is the body or message of the comment cannot be empty)
    if (!req.body.body || req.body.body.trim().length == 0) {
      return res
        .status(400)
        .send({ status: "invalid input", message: "Comment can not be empty" });
    }

    //STEP2: after validations passed, creating a comment object with the given postid
    const postId = new mongoose.Types.ObjectId(req.params.postid);
    const comment = new Comment({
      ...req.body,
      post: postId,
    });
    await comment.save();

    //STEP3: sending the appropriate status and new comment back to the client
    return res.send({ status: "success", comment: comment });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

module.exports = router;
