const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: "Post" },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
