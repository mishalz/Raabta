const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      id: { type: String, required: true },
      username: { type: String, required: true },
    },
    topic: [
      {
        type: String,
        lowercase: true,
        enum: ["politics", "health", "sports", "tech"],
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    likes: [String], //stores the ids in string, of the users that liked the post
    dislikes: [String], //stores the ids in string, of the users that disliked the post
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
