const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  lat: Number,
  lon: Number,
  user: {
    username: String,
    profilePic: String,
  },
});

module.exports = mongoose.model("Report", reportSchema);
