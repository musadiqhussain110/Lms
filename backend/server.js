const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Simple test route
app.get('/', (req, res) => {
  res.json({
    message: '🎉 LMS BACKEND IS RUNNING!',
    endpoints: {
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      register: 'POST /api/auth/register',
      courses: 'GET /api/courses',
      dashboard: 'GET /api/dashboard'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
    message: 'Server is running perfectly!'
  });
});

// Import routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/certificates', require('./routes/certificates'));

// Dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json({
    stats: {
      totalCourses: 12,
      activeStudents: 345,
      instructors: 8,
      completionRate: '78%'
    },
    recentCourses: [
      { id: '1', title: 'React Fundamentals', progress: 65 },
      { id: '2', title: 'Node.js Mastery', progress: 30 }
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 BACKEND RUNNING: http://localhost:${PORT}`);
  console.log(`✅ HEALTH CHECK: http://localhost:${PORT}/api/health`);
  console.log(`✅ API DOCS: http://localhost:${PORT}/`);
});