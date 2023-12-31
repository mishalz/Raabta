/*This file includes r*/
const express = require("express");
const mongoose = require("mongoose");

const Post = require("../models/Post");
const verifyToken = require("../middlewares/verifyToken");
const postValidations = require("../validations/PostValidation");
const checkExpiry = require("../middlewares/checkExpiry");
const commentRoutes = require("./comments");

const router = express.Router();

//forwarding to the routes for interacting with comments of a post
router.use("/comments", commentRoutes);

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
    //STEP2: adding the new post if validations have passed
    const post = new Post({
      ...req.body,
      likes: [],
      dislikes: [],
      author: { username: req.body.author, id: req.user._id },
    });
    const savedPost = await post.save();

    //STEP3: populate the author details before sending back
    return res.send({ status: "success", post: savedPost });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 2: Get all posts by each topic and with the sorting config----->
router.get("/:topic", verifyToken, async (req, res) => {
  try {
    //STEP1: retrieve the desired topic from the params and sorting config from the header
    const topic = req.params.topic.toLowerCase();
    const sortingField = req.header("sort-by");

    //STEP2: query for all posts that have the requested topic and sort accordingly
    const posts = await Post.find({ topic: topic })
      .sort(`-${sortingField}`) //sort according to the sorting config by the user. '-' sign shows 'desc' order
      .limit(10);

    //STEP3: query for all the posts in the topic that the requesting user has liked and disliked
    const likedPosts = await Post.find({ likes: req.user._id }, "_id");
    const dislikedPosts = await Post.find({ dislikes: req.user._id }, "_id");

    //STEP4: send back the posts with the appropriate status
    return res.send({
      status: "success",
      posts: posts,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
    });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 3: Like a post----->
router.post("/:postid/like", verifyToken, checkExpiry, async (req, res) => {
  try {
    //STEP1: find the post by the id
    const post = await Post.findById(req.params.postid);

    //STEP2: check if the user has already liked this post
    if (post.likes.includes(req.user._id))
      return res.send({ status: "failed", message: "post is already liked" });

    //STEP3: check if the user who wants to like the post is the author of the post
    if (post.author.id === req.user._id) {
      return res.send({
        status: "failed",
        message: "Authors cannot like their posts.",
      });
    }

    //STEP4: check if user has disliked this post so that we can remove the user from the dislikes and add him from the likes
    if (post.dislikes.includes(req.user._id)) {
      post.dislikes.pull(req.user._id);
    }

    //STEP 5: push the user id into the likes of the post
    post.likes.push(req.user._id);
    await post.save();

    //STEP6: find the updated arrays of posts that the requesting user has liked and disliked
    const likedPosts = await Post.find({ likes: req.user._id }, "_id");
    const dislikedPosts = await Post.find({ dislikes: req.user._id }, "_id");

    //STEP7: send the data back with appropriate message
    return res.send({
      status: "success",
      likes: post.likes.length,
      dislikes: post.dislikes.length,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
    });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

// <-----Operation 4: Dislike a post----->
router.post("/:postid/dislike", verifyToken, checkExpiry, async (req, res) => {
  try {
    //STEP1: find the post by id
    const post = await Post.findById(req.params.postid);

    //STEP2: check if the user who wants to dislike the post is the author of the post
    if (post.author.id === req.user._id) {
      return res.send({
        status: "failed",
        message: "Authors cannot dislike their posts.",
      });
    }

    //STEP3: check if user has already disliked the post
    if (post.dislikes.includes(req.user._id))
      return res.send({
        status: "failed",
        message: "post is already disliked",
      });

    //STEP4: check if user has liked this post so that we can remove the user from the likes and add him to the dislikes
    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    }

    //STEP5: push the user id into the dislikes of the post
    post.dislikes.push(req.user._id);
    await post.save();

    //STEP6: find the updated arrays of posts that the requesting user has liked and disliked
    const likedPosts = await Post.find({ likes: req.user._id }, "_id");
    const dislikedPosts = await Post.find({ dislikes: req.user._id }, "_id");

    //STEP7: send the data back with appropriate message
    return res.send({
      status: "success",
      likes: post.likes.length,
      dislikes: post.dislikes.length,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
    });
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
});

module.exports = router;
