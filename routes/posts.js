const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const verifyToken = require("../middlewares/verifyToken");
const postValidations = require("../validations/PostValidation");

// <-----Operation 1: Add a post----->
router.post("/", verifyToken, async (req, res) => {
  //STEP1: validating post inputs
  const { error } = postValidations(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: "invalid input", message: error.details[0].message });
  }
  try {
    const post = new Post({
      ...req.body,
      likes: [],
      author: new mongoose.Types.ObjectId(req.user._id),
    });
    const savedPost = await post.save();
    await savedPost.populate("author");
    return res.send({ status: "success", post: savedPost });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

// <-----Operation 2: Get all posts by each topic----->
router.get("/:topic", verifyToken, async (req, res) => {
  try {
    const topic = req.params.topic.toLowerCase();
    const posts = await Post.find({ topic: topic })
      .populate({ path: "author", select: "username" })
      .sort({ createdAt: "desc" })
      .limit(10);

    res.send(posts);
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

// // <-----Operation 3: Get a post----->
// router.get("/:postid", verifyToken, async (req, res) => {
//   try {
//     const post = await Post.findOne({ _id: req.params.postid }).populate(
//       "author",
//       "username"
//     );
//     res.send(post);
//   } catch (e) {
//     res.status(400).send({ message: e });
//   }
// });

// <-----Operation 4: Update a post----->
router.patch("/:postid", (req, res) => {});

// <-----Operation 5: Delete a post----->
router.delete("/:postid", (req, res) => {});

// <-----Operation 6: Get all comments for a post----->
router.get("/:postid/comments", verifyToken, (req, res) => {
  try {
    const comments = new Comment({});
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

// <-----Operation 7: Add a comment for a post----->
router.get("/:postid/comments", verifyToken, (req, res) => {
  try {
    const comments = new Comment({});
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

// <-----Operation 8: Delete a comment for a post----->
router.get("/:postid/comments", verifyToken, (req, res) => {
  try {
    const comments = new Comment({});
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

// <-----Operation 9: Add like on a post----->
router.get("/:postid/like", verifyToken, (req, res) => {
  try {
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

// <-----Operation 9: unlike on a post----->
router.delete("/:postid/like", verifyToken, (req, res) => {
  try {
  } catch (e) {
    res.status(400).send({ message: e });
  }
});

module.exports = router;
