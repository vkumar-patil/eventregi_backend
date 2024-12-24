const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load the .env file
const connectDB = async () => {
  try {
    // Use the environment variable for MongoDB URL
    await mongoose.connect(process.env.mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
};
module.exports = connectDB;

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.mongoDBURL);
//     console.log("database connected");
//   } catch (error) {
//     console.error(error);
//   }
// };
// module.exports = connectDB;
