const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

//importing project files
const postRoutes = require("./routes/posts");

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

// homeroute
app.get("/", (req, res) => res.send("Welcome to Raabta!"));

// Powering the server
app.listen(3000, () => {
  console.log("Server is up.");
});
