const mongoose = require("mongoose");

/* Post Model
    -- title: String
    -- topic: String [] (from a set: {Politics, Health, Sport or Tech}) 
    -- message: String
    -- author: User model
    -- likes: [{
        userId: user object
        username: String
    }]
    -- comments: [comment object ids]
    -- timestamp: Date.now()
    -- expiration: Date */

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      lowercase: true,
      enum: ["politics", "health", "sport", "tech"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

exports.module = mongoose.model("Post", postSchema);
