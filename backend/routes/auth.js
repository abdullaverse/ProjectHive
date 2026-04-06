const express = require('express');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, updateLastLogin, verifyPassword, getUsers } = require('../services/userService');
const { sendWelcomeEmail } = require('../services/emailService');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const row = await createUser({ username, email, password });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, username).catch(() => {});

    const token = jwt.sign(
      { userId: row.get('UserID'), email: email.toLowerCase(), username, role: row.get('Role') || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        userId: row.get('UserID'),
        username,
        email: email.toLowerCase(),
        role: row.get('Role') || 'user',
        createdAt: row.get('CreatedAt'),
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    const message = err.message || (typeof err === 'string' ? err : 'Unknown server error');
    res.status(500).json({ error: message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const row = await findUserByEmail(email);
    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const valid = await verifyPassword(password, row.get('PasswordHash'));
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    await updateLastLogin(email);

    const token = jwt.sign(
      {
        userId: row.get('UserID'),
        email: row.get('Email'),
        username: row.get('Username'),
        role: row.get('Role') || 'user',
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: row.get('UserID'),
        username: row.get('Username'),
        email: row.get('Email'),
        role: row.get('Role') || 'user',
        createdAt: row.get('CreatedAt'),
        lastLogin: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET /api/auth/me — get current user info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const row = await findUserByEmail(req.user.email);
    if (!row) return res.status(404).json({ error: 'User not found' });

    res.json({
      userId: row.get('UserID'),
      username: row.get('Username'),
      email: row.get('Email'),
      role: row.get('Role') || 'user',
      createdAt: row.get('CreatedAt'),
      lastLogin: row.get('LastLogin'),
    });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
