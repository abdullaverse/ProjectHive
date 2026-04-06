const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

let _doc = null;

async function getDoc() {
  if (_doc) return _doc;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || email.includes('your-service-account') || !key || key.includes('REPLACE_WITH_YOUR_KEY') || !sheetId || sheetId.includes('REPLACE_WITH_YOUR_SPREADSHEET_ID')) {
    throw new Error('Google Sheets credentials are not configured. Please update your .env file with valid Service Account details.');
  }

  // Robust key parsing: Remove quotes and fix newlines
  key = key.trim();
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.substring(1, key.length - 1);
  }
  key = key.replace(/\\n/g, '\n');

  try {
    const serviceAccountAuth = new JWT({
      email,
      key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    _doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await _doc.loadInfo();
    console.log('📊 Connected to Google Sheet:', _doc.title);
  } catch (err) {
    console.error('Sheets Connection Error:', err);
    if (err.message.includes('403')) {
      throw new Error('Permission Denied: Please share your Google Sheet with ' + email + ' as an Editor.');
    } else if (err.message.includes('404')) {
      throw new Error('Sheet Not Found: Please verify that the GOOGLE_SHEET_ID in your .env is correct.');
    } else if (err.message.includes('API has not been used')) {
      throw new Error('API Not Enabled: Please enable the "Google Sheets API" in your Google Cloud Console.');
    } else if (err.message.includes('PEM') || err.message.includes('key')) {
      throw new Error('Invalid Private Key: Your GOOGLE_PRIVATE_KEY format in .env is incorrect. Ensure it includes the BEGIN/END headers.');
    }
    throw err;
  }
  
  return _doc;
}

async function getSheet(sheetTitle) {
  const doc = await getDoc();
  let sheet = doc.sheetsByTitle[sheetTitle];
  if (!sheet) {
    // Auto-create the sheet with headers
    const headers = getHeaders(sheetTitle);
    sheet = await doc.addSheet({ title: sheetTitle, headerValues: headers });
    console.log(`📋 Created sheet: ${sheetTitle}`);
  }
  return sheet;
}

function getHeaders(sheetTitle) {
  const map = {
    Users: ['UserID', 'Username', 'Email', 'PasswordHash', 'Role', 'CreatedAt', 'LastLogin'],
    Projects: ['ProjectID', 'Title', 'Department', 'Description', 'Price', 'ImageURL', 'PDFLink', 'Featured', 'CreatedAt'],
    Orders: ['OrderID', 'UserID', 'UserEmail', 'ProjectID', 'ProjectTitle', 'Price', 'Status', 'OrderDate'],
    Categories: ['CategoryID', 'Name', 'Icon', 'Description', 'ProjectCount'],
    ContactMessages: ['MessageID', 'Name', 'Email', 'Subject', 'Message', 'CreatedAt', 'Read'],
    ProjectRequests: ['RequestID', 'UserID', 'UserEmail', 'Title', 'Department', 'Description', 'Budget', 'CreatedAt', 'Status'],
    Reviews: ['ReviewID', 'UserID', 'UserEmail', 'ProjectID', 'Rating', 'Comment', 'CreatedAt'],
  };
  return map[sheetTitle] || ['ID', 'Data'];
}

module.exports = { getDoc, getSheet };
