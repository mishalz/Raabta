const Post = require("../models/Post");

const checkExpiry = async (req, res, next) => {
  try {
    //STEP1: find the post with the id in the parameters
    const postid = req.params.postid;
    const post = await Post.findById(postid);

    //STEP2: get the current time
    const currentDate = new Date();
    const postExpiryDate = new Date(post.expiration);

    //STEP3: find the time between now and the expiry
    const difference = postExpiryDate - currentDate;

    //STEP4: if the difference is 0 or negative, the post has expired, return the error
    if (difference <= 0)
      return res.send({ status: "failed", message: "post is expired" });

    //STEP5: forward the request
    next();
  } catch (e) {
    return res.status(400).send({ status: "error", message: e.message });
  }
};
module.exports = checkExpiry;
