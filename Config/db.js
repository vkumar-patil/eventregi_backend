const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoDBLOCAL);
    console.log("database connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
