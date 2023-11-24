const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 256,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 10,
    max: 256,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

modules.export = mongoose.model("User", userSchema);
