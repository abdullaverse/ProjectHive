const express = require('express');
const { getSheet } = require('../config/sheets');
const { sendContactAutoReply } = require('../services/emailService');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// POST /api/contact — submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const sheet = await getSheet('ContactMessages');
    await sheet.addRow({
      MessageID: uuidv4(),
      Name: name,
      Email: email,
      Subject: subject || 'General Inquiry',
      Message: message,
      CreatedAt: new Date().toISOString(),
      Read: 'false',
    });

    // Auto-reply (non-blocking)
    sendContactAutoReply(email, name).catch(() => {});

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// POST /api/contact/request — project request form
router.post('/request', async (req, res) => {
  try {
    const { title, department, description, budget, userEmail } = req.body;
    if (!title || !department || !description) {
      return res.status(400).json({ error: 'Title, department, and description are required' });
    }
    const sheet = await getSheet('ProjectRequests');
    await sheet.addRow({
      RequestID: uuidv4(),
      UserID: req.body.userId || '',
      UserEmail: userEmail || '',
      Title: title,
      Department: department,
      Description: description,
      Budget: budget || '',
      CreatedAt: new Date().toISOString(),
      Status: 'Pending',
    });
    res.status(201).json({ message: 'Project request submitted' });
  } catch (err) {
    console.error('Request error:', err);
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

// POST /api/contact/review — submit a review
router.post('/review', async (req, res) => {
  try {
    const { userId, userEmail, projectId, rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }
    const sheet = await getSheet('Reviews');
    await sheet.addRow({
      ReviewID: uuidv4(),
      UserID: userId || '',
      UserEmail: userEmail || '',
      ProjectID: projectId || '',
      Rating: rating,
      Comment: comment,
      CreatedAt: new Date().toISOString(),
    });
    res.status(201).json({ message: 'Review submitted' });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

module.exports = router;
