const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const discussionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  messages: [messageSchema]
});

module.exports = mongoose.model("Discussion", discussionSchema);
