import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('student@lms.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock courses data
  const mockCourses = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn React from scratch. Build real projects and master modern React development.',
      instructor: 'John Doe',
      duration: '10 hours',
      price: '$49.99',
      rating: 4.8,
      students: 1500,
      category: 'Web Development',
      enrolled: false,
      progress: 0
    },
    {
      id: '2',
      title: 'Node.js Masterclass',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
      instructor: 'Jane Smith',
      duration: '15 hours',
      price: '$59.99',
      rating: 4.9,
      students: 2300,
      category: 'Backend',
      enrolled: false,
      progress: 0
    },
    {
      id: '3',
      title: 'Full Stack Web Development',
      description: 'Complete MERN stack course with React, Node.js, Express, and MongoDB.',
      instructor: 'Bob Wilson',
      duration: '30 hours',
      price: '$89.99',
      rating: 4.7,
      students: 3200,
      category: 'Full Stack',
      enrolled: false,
      progress: 0
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('lms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCourses(mockCourses);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('Logging in with:', email);
    
    try {
      // Try to call backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        // If backend fails, use mock data
        console.log('Using mock login data');
        data = {
          success: true,
          user: {
            id: '1',
            name: email.split('@')[0],
            email: email,
            role: email.includes('admin') ? 'admin' : 
                   email.includes('instructor') ? 'instructor' : 'student'
          },
          token: 'mock_token_' + Date.now()
        };
      }
      
      if (data.success || response.ok) {
        const userData = data.user || {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: email.includes('admin') ? 'admin' : 
                 email.includes('instructor') ? 'instructor' : 'student'
        };
        
        setUser(userData);
        localStorage.setItem('lms_user', JSON.stringify(userData));
        localStorage.setItem('lms_token', data.token || 'mock_token');
        setCourses(mockCourses);
        
        console.log('Login successful:', userData);
      } else {
        alert(data.message || 'Login failed. Using demo mode.');
        // Use demo mode anyway
        const demoUser = {
          id: 'demo_1',
          name: 'Demo User',
          email: email,
          role: 'student'
        };
        setUser(demoUser);
        localStorage.setItem('lms_user', JSON.stringify(demoUser));
        setCourses(mockCourses);
      }
    } catch (error) {
      console.log('Using offline mode');
      // Offline mode - use mock data
      const offlineUser = {
        id: 'offline_1',
        name: email.split('@')[0],
        email: email,
        role: 'student'
      };
      setUser(offlineUser);
      localStorage.setItem('lms_user', JSON.stringify(offlineUser));
      setCourses(mockCourses);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
    localStorage.removeItem('lms_token');
  };

  const enrollCourse = (courseId) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, enrolled: true, progress: 10 }
          : course
      )
    );
    
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setEnrolledCourses(prev => [...prev, { ...course, enrolled: true, progress: 10 }]);
      alert(`🎉 Successfully enrolled in "${course.title}"!`);
    }
  };

  const updateProgress = (courseId, progress) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, progress: Math.min(100, progress) }
          : course
      )
    );
  };

  if (!user) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            <h1>🎓 LMS Portal</h1>
            <p className="subtitle">Login to continue</p>
            
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button type="submit" disabled={loading} className="login-button">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="demo-accounts">
              <h3>Quick Login:</h3>
              <div className="account-buttons">
                <button onClick={() => {
                  setEmail('admin@lms.com');
                  setPassword('password123');
                }} className="account-btn admin">
                  Admin
                </button>
                <button onClick={() => {
                  setEmail('instructor@lms.com');
                  setPassword('password123');
                }} className="account-btn instructor">
                  Instructor
                </button>
                <button onClick={() => {
                  setEmail('student@lms.com');
                  setPassword('password123');
                }} className="account-btn student">
                  Student
                </button>
                <button onClick={() => {
                  setEmail('musadiqnawab.solangi@gmail.com');
                  setPassword('password123');
                }} className="account-btn personal">
                  Your Email
                </button>
              </div>
            </div>
            
            <div className="server-status">
              <p>Backend Status: 
                <span className="status-indicator online">●</span> 
                {window.navigator.onLine ? 'Online' : 'Offline (Using Mock Data)'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>🎓 Learning Management System</h1>
          <p>Welcome, <strong>{user.name}</strong> ({user.role})</p>
        </div>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Total Courses</h3>
            <p className="stat-number">{courses.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Enrolled</h3>
            <p className="stat-number">{courses.filter(c => c.enrolled).length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Avg Progress</h3>
            <p className="stat-number">
              {courses.filter(c => c.enrolled).length > 0 
                ? Math.round(courses.filter(c => c.enrolled).reduce((sum, c) => sum + c.progress, 0) / 
                            courses.filter(c => c.enrolled).length) 
                : 0}%
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Rating</h3>
            <p className="stat-number">4.8</p>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <main className="main-content">
        <section className="courses-section">
          <div className="section-header">
            <h2>Available Courses</h2>
            <p>Enroll in courses and start learning</p>
          </div>
          
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <div className="course-category">{course.category}</div>
                  <div className="course-rating">⭐ {course.rating}</div>
                </div>
                
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-meta">
                  <span className="meta-item">👨‍🏫 {course.instructor}</span>
                  <span className="meta-item">⏱️ {course.duration}</span>
                  <span className="meta-item">👥 {course.students} students</span>
                </div>
                
                {course.enrolled ? (
                  <div className="progress-section">
                    <div className="progress-label">
                      <span>Progress: {course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-actions">
                      <button 
                        onClick={() => updateProgress(course.id, course.progress + 10)}
                        className="progress-btn"
                      >
                        Mark as Watched (+10%)
                      </button>
                      <button 
                        onClick={() => updateProgress(course.id, 100)}
                        className="progress-btn complete"
                      >
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="course-footer">
                    <div className="course-price">{course.price}</div>
                    <button 
                      onClick={() => enrollCourse(course.id)}
                      className="enroll-btn"
                    >
                      Enroll Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Instructor Panel (if instructor/admin) */}
        {(user.role === 'instructor' || user.role === 'admin') && (
          <section className="instructor-panel">
            <h2>Instructor Dashboard</h2>
            <div className="instructor-tools">
              <button className="tool-btn">
                <span>➕</span> Create Course
              </button>
              <button className="tool-btn">
                <span>📊</span> Analytics
              </button>
              <button className="tool-btn">
                <span>📝</span> Grade Assignments
              </button>
              <button className="tool-btn">
                <span>👥</span> Manage Students
              </button>
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">
              <span>📚</span> My Courses
            </button>
            <button className="action-btn">
              <span>❓</span> Take Quiz
            </button>
            <button className="action-btn">
              <span>💬</span> Discussions
            </button>
            <button className="action-btn">
              <span>🏆</span> Certificates
            </button>
            <button className="action-btn">
              <span>📖</span> Resources
            </button>
            <button className="action-btn">
              <span>⚙️</span> Settings
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Learning Management System. All rights reserved.</p>
        <p>Status: {window.navigator.onLine ? '🟢 Online' : '🔴 Offline (Using Mock Data)'}</p>
      </footer>
    </div>
  );
}

export default App;