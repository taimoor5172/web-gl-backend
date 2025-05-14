const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
