// backend/models/Course.js
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: Number,
  order: Number
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  modules: [moduleSchema],
  category: String,
  price: Number,
  thumbnail: String,
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);