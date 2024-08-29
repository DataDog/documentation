import * as fs from 'fs';
import * as path from 'path';

function scanDirectory(directory: string): string[] {
  let mdFiles: string[] = [];

  function recursiveScan(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        recursiveScan(fullPath);
      } else if (stat.isFile() && path.extname(fullPath) === '.md') {
        mdFiles.push(fullPath);
      }
    }
  }

  recursiveScan(directory);
  return mdFiles;
}

const directoryPath = '/Users/jen.gilbert/dd/documentation/content/en';
const mdFiles = scanDirectory(directoryPath);

const codeblockRegex =
  /\{\{<\s*code-block\b[^>]*>\}\}([\s\S]*?)\{\{<\s*\/\s*code-block\s*>\}\}/g;
const codeFenceRegex = /```([\s\S]*?)```/g;
const shortcodeRegex = /\{\{\s*<?%?\s*([a-zA-Z0-9-]+)\b[^\/]*\/?\s*>?%?\s*\}\}/g;

const tagNamesFound = new Set<string>();

mdFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');

  let match;
  while ((match = codeFenceRegex.exec(content))) {
    const contents = match[1];
    // console.log('\n\n\nCaptured code block content:', contents);
    while ((match = shortcodeRegex.exec(contents))) {
      const tagName = match[1];
      if (tagName === 'region-param') {
        console.log('Found region-param shortcode in file:', file);
        console.log(match[0]);
      }
    }
  }
});

console.log('Tag names found:', tagNamesFound);
