const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
require('colors');

const userRoute = require('./routes/User.routes')

const CONNECTION_URL = process.env.CONNECTION_URL;

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const connectDB = async () => {
    const conn = await mongoose.connect(CONNECTION_URL);
    console.log('MongoDB Connected Succesfully'.blue);
  };
  
  connectDB()
    .then(app.listen(PORT, () => console.log(`Server Is Running on Port: ${PORT}`.blue)))
    .catch((err) => console.log("Error: ".red , err));

//ROUTES

app.get('/', (req, res) => {
    res.send("Hey! I am doing fine. Thanks for checking up on me :)");
});

app.use('/user' , userRoute)



module.exports = app;