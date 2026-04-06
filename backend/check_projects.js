const { getAllProjects } = require('./services/projectService');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

async function checkProjects() {
  try {
    const projects = await getAllProjects();
    console.log('📦 Projects found:', projects.length);
    if (projects.length > 0) {
      console.log('🖼️ First Project ImageURL:', projects[0].ImageURL);
      console.log('🔍 First Project Data:', JSON.stringify(projects[0], null, 2));
    }
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkProjects();
