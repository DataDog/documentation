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

const shortcodeCountByTagName: Record<string, number> = {};

mdFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /\{\{<?\s*([\w\-]+)[^>]*>?\}\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tagName = match[1];
    if (shortcodeCountByTagName[tagName]) {
      shortcodeCountByTagName[tagName]++;
    } else {
      shortcodeCountByTagName[tagName] = 1;
    }
  }
});

// sort by count
const sortedShortcodes = Object.entries(shortcodeCountByTagName).sort(
  ([, a], [, b]) => b - a
);

let outfilePath = __dirname + '/shortcodeStats.json';
outfilePath = outfilePath.replace('dist', 'src');
fs.writeFileSync(outfilePath, JSON.stringify(sortedShortcodes, null, 2));
