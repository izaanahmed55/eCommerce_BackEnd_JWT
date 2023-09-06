const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const connectDB = async () => {
  const conn = await mongoose.connect(CONNECTION_URL);
  console.log("MongoDB Connected Succesfully");
};

connectDB()
  .then(app.listen(PORT, () => console.log(`Server Is Running on Port: ${PORT}`)))
  .catch((err) => console.log("Error: ", err));

module.exports = app;