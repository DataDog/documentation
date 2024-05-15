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
      const actions = Object.entries(deref['actions']);
      const actionLen = actions.length;
      let i = 0;
      actions.forEach(([action_key, action_value]) => {
        const inputKey = action_value.input.replace('#/$defs/', '');
        const outputKey = action_value.output.replace('#/$defs/', '');
        outputTableEntry(fs, input, deref, inputKey, false);
        outputTableEntry(fs, input, deref, outputKey, (i >= actionLen - 1));
        i++;
      });
      fs.appendFileSync(output, "}\n", 'utf-8');
    });


function outputTableEntry(fs, input, deref, key, isLast) {
  table = null;
  try {
    table = schemaTable("request", deref['types']['$defs'][key], true);
  } catch (e) {
    console.log(`Couldn't create schematable for ${key} from file ${input}`);
  }
  if(table) {
    const trail = isLast ? "\n" : ",\n" ;
    fs.appendFileSync(output, `\t"${key}": ${JSON.stringify(table)}${trail}`, 'utf-8');
  }
}
