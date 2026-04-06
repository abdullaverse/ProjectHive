const { getSheet } = require('../config/sheets');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const SHEET = 'Users';

async function getUsers() {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  return rows.map(r => ({
    UserID: r.get('UserID'),
    Username: r.get('Username'),
    Email: r.get('Email'),
    Role: r.get('Role') || 'user',
    CreatedAt: r.get('CreatedAt'),
    LastLogin: r.get('LastLogin'),
  }));
}

async function findUserByEmail(email) {
  const sheet = await getSheet(SHEET);
  const rows = await sheet.getRows();
  return rows.find(r => r.get('Email')?.toLowerCase() === email.toLowerCase());
}

async function createUser({ username, email, password, role = 'user' }) {
  const sheet = await getSheet(SHEET);
  const hash = await bcrypt.hash(password, 12);
  const now = new Date().toISOString();
  const row = await sheet.addRow({
    UserID: uuidv4(),
    Username: username,
    Email: email.toLowerCase(),
    PasswordHash: hash,
    Role: role,
    CreatedAt: now,
    LastLogin: now,
  });
  return row;
}

async function updateLastLogin(email) {
  const row = await findUserByEmail(email);
  if (row) {
    row.set('LastLogin', new Date().toISOString());
    await row.save();
  }
  return row;
}

async function verifyPassword(plainPassword, hashPassword) {
  return bcrypt.compare(plainPassword, hashPassword);
}

module.exports = { getUsers, findUserByEmail, createUser, updateLastLogin, verifyPassword };
