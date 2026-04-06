const { getSheet } = require('../config/sheets');
const { v4: uuidv4 } = require('uuid');

const SHEET = 'Orders';

async function createOrder({ userId, userEmail, projectId, projectTitle, price }) {
  const sheet = await getSheet(SHEET);
  const row = await sheet.addRow({
    OrderID: uuidv4(),
    UserID: userId,
    UserEmail: userEmail,
    ProjectID: projectId,
    ProjectTitle: projectTitle,
    Price: price,
    Status: 'Pending',
    OrderDate: new Date().toISOString(),
  });
  return {
    OrderID: row.get('OrderID'),
    UserID: row.get('UserID'),
    ProjectID: row.get('ProjectID'),
    ProjectTitle: row.get('ProjectTitle'),
    Price: row.get('Price'),
    Status: row.get('Status'),
    OrderDate: row.get('OrderDate'),
  };
}

async function getOrdersByUser(userId) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  return rows
    .filter(r => r.get('UserID') === userId)
    .map(r => ({
      OrderID: r.get('OrderID'),
      ProjectID: r.get('ProjectID'),
      ProjectTitle: r.get('ProjectTitle'),
      Price: r.get('Price'),
      Status: r.get('Status'),
      OrderDate: r.get('OrderDate'),
    }));
}

async function getAllOrders() {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  return rows.map(r => ({
    OrderID: r.get('OrderID'),
    UserID: r.get('UserID'),
    UserEmail: r.get('UserEmail'),
    ProjectID: r.get('ProjectID'),
    ProjectTitle: r.get('ProjectTitle'),
    Price: r.get('Price'),
    Status: r.get('Status'),
    OrderDate: r.get('OrderDate'),
  }));
}

async function updateOrderStatus(orderId, status) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  const row = rows.find(r => r.get('OrderID') === orderId);
  if (!row) return null;
  row.set('Status', status);
  await row.save();
  return row;
}

module.exports = { createOrder, getOrdersByUser, getAllOrders, updateOrderStatus };
