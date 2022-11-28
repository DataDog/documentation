#!/usr/bin/env node
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');
const myArgs = process.argv.slice(2);
const input = (myArgs.length > 0) ? myArgs[0] : '';
const output = (myArgs.length > 1) ? myArgs[1] : '';
const schemaTable = require('./build-api-pages').schemaTable;

if(!input || !output) {
  console.log("Missing input/outputs")
  process.exit(1);
}

let fileData = JSON.parse(fs.readFileSync(input, 'utf8'));
const yData = JSON.stringify(fileData["types"]["$defs"]).replace(/\#\/\$defs\//g, '#/types/$defs/');
fileData["types"]["$defs"] = JSON.parse(yData);
let table = null;

$RefParser.dereference(fileData)
    .then((deref) => {
      fs.writeFileSync(output, "{\n", 'utf-8');
      const entries = Object.entries(deref['types']['$defs']);
      const entryLen = entries.length;
      let i = 0;
      entries.forEach(([key, value]) => {
          table = null;
          try {
            table = schemaTable("request", value, true);
          } catch (e) {
            console.log(`Couldn't created schematable for ${key} from file ${input}`);
          }
          if(table) {
            const trail = (i < entryLen - 1) ? ",\n" : "\n";
            fs.appendFileSync(output, `\t"${key}": ${JSON.stringify(table)}${trail}`, 'utf-8');
          }
          i++;
      });
      fs.appendFileSync(output, "}\n", 'utf-8');
    });
