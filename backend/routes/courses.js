const express = require('express');
const router = express.Router();

// Mock courses data
const courses = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn React from scratch. Build real projects and master modern React development.',
    instructor: 'John Doe',
    instructorId: '3',
    duration: '10 hours',
    price: '$49.99',
    rating: 4.8,
    students: 1500,
    modules: 12,
    category: 'Web Development',
    thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=React',
    enrolled: true,
    progress: 65
  },
  {
    id: '2',
    title: 'Node.js Masterclass',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
    instructor: 'Jane Smith',
    instructorId: '3',
    duration: '15 hours',
    price: '$59.99',
    rating: 4.9,
    students: 2300,
    modules: 15,
    category: 'Backend',
    thumbnail: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Node.js',
    enrolled: true,
    progress: 30
  },
  {
    id: '3',
    title: 'Full Stack Web Development',
    description: 'Complete MERN stack course with React, Node.js, Express, and MongoDB.',
    instructor: 'Bob Wilson',
    instructorId: '3',
    duration: '30 hours',
    price: '$89.99',
    rating: 4.7,
    students: 3200,
    modules: 25,
    category: 'Full Stack',
    thumbnail: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=MERN',
    enrolled: false,
    progress: 0
  },
  {
    id: '4',
    title: 'JavaScript Basics',
    description: 'Learn JavaScript fundamentals for beginners. Perfect starting point.',
    instructor: 'Alice Johnson',
    instructorId: '3',
    duration: '8 hours',
    price: 'Free',
    rating: 4.6,
    students: 4500,
    modules: 10,
    category: 'Programming',
    thumbnail: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=JavaScript',
    enrolled: false,
    progress: 0
  }
];

// GET ALL COURSES
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: courses.length,
    courses: courses
  });
});

// GET SINGLE COURSE
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }
  
  res.json({
    success: true,
    course: course
  });
});

// ENROLL IN COURSE
router.post('/:id/enroll', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }
  
  course.enrolled = true;
  course.progress = 10; // Start with 10% progress
  
  res.json({
    success: true,
    message: `Successfully enrolled in ${course.title}`,
    course: course
  });
});

module.exports = router;