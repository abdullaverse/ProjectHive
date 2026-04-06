const { getSheet } = require('../config/sheets');
const { v4: uuidv4 } = require('uuid');

const SHEET = 'Projects';

async function getAllProjects() {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  return rows.map(r => ({
    ProjectID: r.get('ProjectID'),
    Title: r.get('Title'),
    Department: r.get('Department'),
    Description: r.get('Description'),
    Price: r.get('Price'),
    ImageURL: r.get('ImageURL'),
    PDFLink: r.get('PDFLink'),
    Featured: r.get('Featured') === 'true',
    CreatedAt: r.get('CreatedAt'),
  }));
}

async function getProjectById(id) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('ProjectID') === id);
  if (!row) return null;
  return {
    ProjectID: row.get('ProjectID'),
    Title: row.get('Title'),
    Department: row.get('Department'),
    Description: row.get('Description'),
    Price: row.get('Price'),
    ImageURL: row.get('ImageURL'),
    PDFLink: row.get('PDFLink'),
    Featured: row.get('Featured') === 'true',
    CreatedAt: row.get('CreatedAt'),
  };
}

async function getProjectsByDepartment(dept) {
  const all = await getAllProjects();
  return all.filter(p => p.Department?.toLowerCase() === dept.toLowerCase());
}

async function createProject(data) {
  const sheet = await getSheet(SHEET);
  const row = await sheet.addRow({
    ProjectID: uuidv4(),
    Title: data.title,
    Department: data.department,
    Description: data.description,
    Price: data.price,
    ImageURL: data.imageURL || '',
    PDFLink: data.pdfLink || '',
    Featured: data.featured ? 'true' : 'false',
    CreatedAt: new Date().toISOString(),
  });
  return row;
}

async function updateProject(id, data) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('ProjectID') === id);
  if (!row) return null;
  if (data.title) row.set('Title', data.title);
  if (data.department) row.set('Department', data.department);
  if (data.description) row.set('Description', data.description);
  if (data.price) row.set('Price', data.price);
  if (data.imageURL !== undefined) row.set('ImageURL', data.imageURL);
  if (data.pdfLink !== undefined) row.set('PDFLink', data.pdfLink);
  if (data.featured !== undefined) row.set('Featured', data.featured ? 'true' : 'false');
  await row.save();
  return row;
}

async function deleteProject(id) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('ProjectID') === id);
  if (!row) return false;
  await row.delete();
  return true;
}

module.exports = { getAllProjects, getProjectById, getProjectsByDepartment, createProject, updateProject, deleteProject };
