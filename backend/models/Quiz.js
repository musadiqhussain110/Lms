// backend/models/Quiz.js
const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number // index of correct answer
});

const quizSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  questions: [questionsSchema],
  timeLimit: Number // in minutes
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);