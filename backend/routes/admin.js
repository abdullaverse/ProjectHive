const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { createProject, updateProject, deleteProject, getAllProjects } = require('../services/projectService');
const { getAllOrders, updateOrderStatus } = require('../services/orderService');
const { getUsers } = require('../services/userService');
const { getSheet } = require('../config/sheets');
const { sendDeliveryNotification } = require('../services/emailService');

const router = express.Router();

// All admin routes require auth + admin role
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [users, projects, orders] = await Promise.all([
      getUsers(),
      getAllProjects(),
      getAllOrders(),
    ]);
    res.json({
      totalUsers: users.length,
      totalProjects: projects.length,
      totalOrders: orders.length,
      revenue: orders.reduce((s, o) => s + (parseFloat(o.Price) || 0), 0),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/admin/projects
router.post('/projects', async (req, res) => {
  try {
    const row = await createProject(req.body);
    res.status(201).json({ message: 'Project created', projectId: row.get('ProjectID') });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/admin/projects/:id
router.put('/projects/:id', async (req, res) => {
  try {
    const row = await updateProject(req.params.id, req.body);
    if (!row) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/admin/projects/:id
router.delete('/projects/:id', async (req, res) => {
  try {
    const ok = await deleteProject(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const row = await updateOrderStatus(req.params.id, status);
    if (!row) return res.status(404).json({ error: 'Order not found' });

    // If delivered, send notification
    if (status === 'Delivered') {
      sendDeliveryNotification(row.get('UserEmail'), {
        ProjectTitle: row.get('ProjectTitle'),
        OrderID: row.get('OrderID'),
      }).catch(() => {});
    }

    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// GET /api/admin/messages
router.get('/messages', async (req, res) => {
  try {
    const sheet = await getSheet('ContactMessages');
    const rows = await sheet.getRows();
    res.json(rows.map(r => ({
      MessageID: r.get('MessageID'),
      Name: r.get('Name'),
      Email: r.get('Email'),
      Subject: r.get('Subject'),
      Message: r.get('Message'),
      CreatedAt: r.get('CreatedAt'),
      Read: r.get('Read'),
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
