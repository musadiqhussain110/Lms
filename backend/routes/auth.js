const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// LOGIN - ALWAYS SUCCESSFUL
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('📧 Login attempt:', email, 'Password:', password);
    
    // ALWAYS SUCCESS - For demo purposes
    const users = {
      'admin@lms.com': { id: '1', name: 'Admin User', role: 'admin' },
      'student@lms.com': { id: '2', name: 'Student User', role: 'student' },
      'instructor@lms.com': { id: '3', name: 'Instructor User', role: 'instructor' },
      'musadiqnawab.solangi@gmail.com': { id: '4', name: 'Musadiq Nawab', role: 'student' }
    };
    
    const user = users[email] || {
      id: Date.now().toString(),
      name: email.split('@')[0],
      role: 'student'
    };
    
    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        email: email,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );
    
    console.log('✅ Login successful for:', email);
    
    res.json({
      success: true,
      message: 'Login successful!',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: true, // Even on error, return success for demo
      message: 'Login successful (demo mode)',
      token: 'demo_token_' + Date.now(),
      user: {
        id: 'demo_id',
        name: 'Demo User',
        email: req.body.email || 'demo@demo.com',
        role: 'student'
      }
    });
  }
});

// Other routes remain the same...
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration successful!',
    token: 'demo_token_' + Date.now(),
    user: {
      id: 'demo_id',
      name: req.body.name || 'New User',
      email: req.body.email || 'new@user.com',
      role: req.body.role || 'student'
    }
  });
});

router.get('/me', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'demo_id',
      name: 'Demo User',
      email: 'demo@demo.com',
      role: 'student'
    }
  });
});

module.exports = router;