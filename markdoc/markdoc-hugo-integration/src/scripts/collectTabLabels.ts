import * as fs from 'fs';
import * as path from 'path';
import { snakecase } from 'stringcase';
import yaml from 'js-yaml';

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

// Example usage:
const directoryPath = '/Users/jen.gilbert/dd/documentation/content/en';
const mdFiles = scanDirectory(directoryPath);

interface OptionValue {
  display_name: string;
  id: string;
  count: number;
}

const optionValuesByTabLabel: Record<string, OptionValue> = {};

mdFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const tabMatches = content.match(/\{\{% tab "([^"]+)" %\}\}/g);
  if (tabMatches) {
    tabMatches.forEach((match) => {
      // @ts-ignore
      const tabLabel = match.match(/\{\{% tab "([^"]+)" %\}\}/)[1];
      if (!optionValuesByTabLabel[tabLabel]) {
        optionValuesByTabLabel[tabLabel] = {
          display_name: tabLabel,
          id: snakecase(tabLabel),
          count: 1
        };
      } else {
        optionValuesByTabLabel[tabLabel].count++;
      }
    });
  }
});

// sort the optionValues by display_name
const sortedOptionValues = Array.from(Object.values(optionValuesByTabLabel))
  .filter((optionValue) => {
    return optionValue.count > 3;
  })
  .sort((a, b) => a.display_name.localeCompare(b.display_name));

let outfilePath = __dirname + '/tabLabels.yaml';
outfilePath = outfilePath.replace('dist', 'src');
const yamlStr = yaml.dump([...sortedOptionValues]);
fs.writeFileSync(outfilePath, yamlStr);

console.log(`Wrote ${sortedOptionValues.length} option values.`);
