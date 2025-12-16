const fs = require('fs');
const path = require('path');

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');
console.log('Projects Directory:', projectsDirectory);

try {
  const fileNames = fs.readdirSync(projectsDirectory);
  console.log('Files found:', fileNames);
} catch (error) {
  console.error('Error reading directory:', error);
}
