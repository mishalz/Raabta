const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")
const verifyToken =require('../middlewares/verifyToken')

// <-----Operation 1: Add a post----->
router.post("/", verifyToken, async(req, res) => {
  try{
    const post = new Post({
      ...req.body,
      author: new mongoose.Types.ObjectId(req.user._id)
    })
    const savedPost = await post.save()
    res.send(savedPost)
  }
  catch(e){
    res.status(400).send({message:e.message})
  }
});

// <-----Operation 2: Get all posts----->
router.get("/", async(req, res) => {
  try{
    const posts = await Post.find().populate('author','username')
    res.send(posts)
  }
  catch(e){
    res.status(400).send({message:e})
  }
});

// <-----Operation 3: Get a post----->
router.get("/:postid", async(req, res) => {
  try{
    const post = await Post.findOne({_id:req.params.postid}).populate('author','username')
    res.send(post)
  }
  catch(e){
    res.status(400).send({message:e})
  }
});

// <-----Operation 4: Update a post----->
router.patch("/:postid", (req, res) => {});

// <-----Operation 5: Delete a post----->
router.delete("/:postid", (req, res) => {});

// <-----Operation 5: Get all comments for a post----->
router.get('/:postid/comments',(req,res)=>{
  try{
    const comments = Comment
  }
  catch(e){
    res.status(400).send({message:e})
  }
})

module.exports = router;
