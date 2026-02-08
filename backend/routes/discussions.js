const express = require('express');
const router = express.Router();

// Mock discussions
const discussions = [
  {
    id: '1',
    courseId: '1',
    title: 'How to handle state in large applications?',
    content: 'I\'m having trouble managing state in my large React application. Any suggestions?',
    author: 'Student User',
    authorId: '2',
    replies: [
      {
        id: '1',
        content: 'Try using Redux or Context API for global state management.',
        author: 'Instructor User',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        content: 'I recommend Zustand - it\'s much simpler than Redux!',
        author: 'Admin User',
        timestamp: '2024-01-15T11:45:00Z'
      }
    ],
    timestamp: '2024-01-15T09:15:00Z'
  }
];

// GET DISCUSSIONS FOR COURSE
router.get('/course/:courseId', (req, res) => {
  const courseDiscussions = discussions.filter(d => d.courseId === req.params.courseId);
  
  res.json({
    success: true,
    discussions: courseDiscussions
  });
});

// CREATE DISCUSSION
router.post('/', (req, res) => {
  const { courseId, title, content, author, authorId } = req.body;
  
  const newDiscussion = {
    id: (discussions.length + 1).toString(),
    courseId,
    title,
    content,
    author,
    authorId,
    replies: [],
    timestamp: new Date().toISOString()
  };
  
  discussions.push(newDiscussion);
  
  res.status(201).json({
    success: true,
    message: 'Discussion created successfully',
    discussion: newDiscussion
  });
});

// ADD REPLY
router.post('/:id/reply', (req, res) => {
  const discussion = discussions.find(d => d.id === req.params.id);
  
  if (!discussion) {
    return res.status(404).json({
      success: false,
      message: 'Discussion not found'
    });
  }
  
  const { content, author } = req.body;
  
  const newReply = {
    id: (discussion.replies.length + 1).toString(),
    content,
    author,
    timestamp: new Date().toISOString()
  };
  
  discussion.replies.push(newReply);
  
  res.json({
    success: true,
    message: 'Reply added successfully',
    reply: newReply
  });
});

module.exports = router;