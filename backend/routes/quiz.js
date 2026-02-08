const express = require('express');
const router = express.Router();

// Mock quizzes
const quizzes = [
  {
    id: '1',
    courseId: '1',
    title: 'React Basics Quiz',
    description: 'Test your React fundamentals knowledge',
    questions: [
      {
        id: 1,
        question: 'What is React?',
        options: [
          'A JavaScript framework',
          'A JavaScript library for building user interfaces',
          'A programming language',
          'A database'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is JSX?',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JavaScript Extension',
          'Java XML'
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'What hook is used for state in functional components?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useReducer'
        ],
        correctAnswer: 1
      }
    ],
    timeLimit: 10, // minutes
    passingScore: 70
  }
];

// GET QUIZ BY COURSE
router.get('/course/:courseId', (req, res) => {
  const quiz = quizzes.find(q => q.courseId === req.params.courseId);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: 'No quiz found for this course'
    });
  }
  
  res.json({
    success: true,
    quiz: quiz
  });
});

// SUBMIT QUIZ
router.post('/submit', (req, res) => {
  const { quizId, answers } = req.body;
  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return res.status(404).json({
      success: false,
      message: 'Quiz not found'
    });
  }
  
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctAnswer) {
      score++;
    }
  });
  
  const percentage = (score / quiz.questions.length) * 100;
  const passed = percentage >= quiz.passingScore;
  
  res.json({
    success: true,
    score: score,
    total: quiz.questions.length,
    percentage: percentage.toFixed(2),
    passed: passed,
    message: passed ? 'Congratulations! You passed the quiz!' : 'Try again! You need more practice.'
  });
});

module.exports = router;