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

$RefParser.dereference(fileData)
    .then((deref) => {
      // fs.writeFileSync(output, safeJsonStringify(deref, null, 2), 'utf-8');
      const jsonDataFile = {};
      Object.entries(deref['types']['$defs']).forEach(([key, value]) => {
        jsonDataFile[key] = schemaTable("request", value);
      });
      fs.writeFileSync(output, safeJsonStringify(jsonDataFile, null, 2), 'utf-8');
    });
