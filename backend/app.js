const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

//importing project files
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

// Starting an express app
const app = express();

// MongoDB connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is up and running"));

//<-----Routes----->
// route middlewares
app.use(bodyparser.json());
app.use("/posts", postRoutes);
app.use("/user", authRoutes);

// Powering the server
app.listen(8000, () => {
  console.log("Server is up.");
});
