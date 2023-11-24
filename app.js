const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB is up and running"));

const app = express();

//Basic home route
app.get("/", (req, res) => res.send("Welcome to Raabta!"));

app.listen(3000, () => {
  console.log("Server is up.");
});
