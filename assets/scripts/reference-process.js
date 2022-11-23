#!/usr/bin/env node
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');
const myArgs = process.argv.slice(2);
const input = (myArgs.length > 0) ? myArgs[0] : './data/reference/schema.json';
const output = (myArgs.length > 1) ? myArgs[1] : './data/reference/schema.deref.json';
const schemaTable = require('./build-api-pages').schemaTable;

if(!input || !output) {
  console.log("Missing input/outputs")
  process.exit(1);
}

let fileString = fs.readFileSync(input, 'utf8');
fileString = fileString.replace('  "$ref": "#/definitions/vector::config::builder::ConfigBuilder",', '');
let fileData = JSON.parse(fileString);

let table = null;
$RefParser.dereference(fileData)
    .then((deref) => {
      // write dereference
      fs.writeFileSync(
            output,
            safeJsonStringify(deref, null, 2),
            'utf8'
        );

      // write schema tables
      fs.writeFileSync("./data/reference/schema.tables.json", "{\n", 'utf-8');
      const entries = Object.entries(deref['definitions']);
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
            fs.appendFileSync("./data/reference/schema.tables.json", `\t"${key}": ${JSON.stringify(table)}${trail}`, 'utf-8');
          }
          i++;
      });
      fs.appendFileSync("./data/reference/schema.tables.json", "}\n", 'utf-8');
    });
