const { getSheet } = require('./config/sheets');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

async function checkHeaders() {
  try {
    const sheet = await getSheet('Projects');
    console.log('📝 Sheet Headers:', sheet.headerValues);
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkHeaders();
