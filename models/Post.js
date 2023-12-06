const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [String],
    dislikes: [String],
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        datePosted: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
