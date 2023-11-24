const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

modules.export = mongoose.model("Comment", commentSchema);
