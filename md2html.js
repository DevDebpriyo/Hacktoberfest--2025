// md2html.js
const fs = require('fs');
const path = require('path');

function mdToHtml(filePath) {
  if (!fs.existsSync(filePath)) return console.error('File not found');
  let content = fs.readFileSync(filePath, 'utf-8');

  // Basic markdown replacements
  content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  content = content.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>');
  content = content.replace(/\*(.*)\*/gim, '<i>$1</i>');
  content = content.replace(/`(.*)`/gim, '<code>$1</code>');
  content = content.replace(/\n$/gim, '<br>');

  const outFile = path.basename(filePath, '.md') + '.html';
  fs.writeFileSync(outFile, content);
  console.log(`Converted ${filePath} → ${outFile}`);
}

// Example usage: node md2html.js README.md
if (require.main === module) {
  const inputFile = process.argv[2];
  if (!inputFile) return console.error('Usage: node md2html.js <file.md>');
  mdToHtml(inputFile);
}

module.exports = mdToHtml;
