import * as fs from 'fs';
import * as path from 'path';
import { snakecase } from 'stringcase';
import yaml from 'js-yaml';

const leftNavFilePath =
  '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/config/_default/menus/main.en.yaml';

// load the file as yaml
const leftNavYaml = yaml.load(fs.readFileSync(leftNavFilePath, 'utf8')) as any;

const countByLabelName: Record<string, number> = {};

if (leftNavYaml.menu.main) {
  leftNavYaml.menu.main.forEach((item: any) => {
    if (item.name) {
      if (!countByLabelName[item.name]) {
        countByLabelName[item.name] = 1;
      } else {
        countByLabelName[item.name]++;
      }
    }
  });
}

const commonValues = Object.keys(countByLabelName).filter((key) => {
  return countByLabelName[key] > 4;
});

commonValues.forEach((value) => {
  console.log(value);
  console.log(countByLabelName[value]);
  console.log('---');
});

console.log(`${commonValues.length} values found.`);
