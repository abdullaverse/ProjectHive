const express = require('express');
const { createOrder, getOrdersByUser } = require('../services/orderService');
const { getProjectById } = require('../services/projectService');
const { sendOrderConfirmation } = require('../services/emailService');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST /api/orders — place an order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ error: 'projectId required' });

    const project = await getProjectById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const order = await createOrder({
      userId: req.user.userId,
      userEmail: req.user.email,
      projectId: project.ProjectID,
      projectTitle: project.Title,
      price: project.Price,
    });

    // Send confirmation email (non-blocking)
    sendOrderConfirmation(req.user.email, order).catch(() => {});

    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// GET /api/orders — user's orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.user.userId);
    res.json(orders);
  } catch (err) {
    console.error('Orders error:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
