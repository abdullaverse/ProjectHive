const express = require('express');
const { getAllProjects, getProjectById, getProjectsByDepartment } = require('../services/projectService');

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { department, featured } = req.query;
    let projects = department
      ? await getProjectsByDepartment(department)
      : await getAllProjects();
    if (featured === 'true') {
      projects = projects.filter(p => p.Featured);
    }
    res.json(projects);
  } catch (err) {
    console.error('Projects error:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Project error:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

module.exports = router;
