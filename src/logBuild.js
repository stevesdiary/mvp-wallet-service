const fs = require('fs');
const path = require('path');

const logDirectoryContents = (dir, level = 0) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    console.log(`${' '.repeat(level * 2)}- ${file}`);
    if (stat.isDirectory()) {
      logDirectoryContents(filePath, level + 1);
    }
  });
};

console.log('Build directory contents:');
logDirectoryContents('./build');
