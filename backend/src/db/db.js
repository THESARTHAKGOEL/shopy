const mongoose = require("mongoose");

const connect = () => {
  const mongoUri = process.env.MONGO_URI;
  
  if (!mongoUri) {
    console.error("MONGO_URI not found in environment variables!");
    return;
  }
  
  console.log("Connecting to:", mongoUri.split("@")[0] + "@****"); // Hide password in logs

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection error:", err);
    });
};

module.exports = connect;
