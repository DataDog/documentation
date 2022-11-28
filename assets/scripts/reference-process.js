#!/usr/bin/env node
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');
const myArgs = process.argv.slice(2);
const input = (myArgs.length > 0) ? myArgs[0] : './data/reference/schema.json';
const output = (myArgs.length > 1) ? myArgs[1] : './data/reference/schema.deref.json';
const schemaTable = require('./build-api-pages').schemaTable;
const filterExampleJson = require('./build-api-pages').filterExampleJson;
const tomlify = require('tomlify-j0.4');

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
      //fs.writeFileSync("./data/reference/schema.tables.json", "{\n", 'utf-8');
      const allData = {"sources":[]};

      const entries = Object.entries(deref['definitions']["vector::sources::Sources"]["oneOf"]);
      const entryLen = entries.length;
      let i = 0;
      entries.forEach(([key, value]) => {
          let entryData = {
            //"simple": value.allOf[1],
            "description": value.description || "",
            "metadata": value._metadata || {},
            "simple": exampleToml(value.allOf[1]),
            "advanced": exampleToml(value.allOf[1], value.allOf[0]),
            "html": {}
          };
          table = null;
          try {
            table = schemaTable("request", value.allOf[0], true);
          } catch (e) {
            console.log(`Couldn't created schematable for ${key} from file ${input}`);
          }

          //entryData["html"] = JSON.stringify(table);
          entryData["html"] = table;
          // if(value.hasOwnProperty('oneOf')) {
          //   entryData["simple"] = value.oneOf[1];
          // }

          //const trail = (i < entryLen - 1) ? ",\n" : "\n";
          //fs.appendFileSync("./data/reference/schema.tables.json", `\t"${key}": ${JSON.stringify(entryData)}${trail}`, 'utf-8');
          //fs.appendFileSync("./data/reference/schema.tables.json", `\t"${JSON.stringify(entryData)}${trail}`, 'utf-8');

          // if(table) {
          //   const trail = (i < entryLen - 1) ? ",\n" : "\n";
          //   fs.appendFileSync("./data/reference/schema.tables.json", `\t"${key}": ${JSON.stringify(table)}${trail}`, 'utf-8');
          // }
          allData["sources"].push(entryData)
          i++;
      });
      //fs.appendFileSync("./data/reference/schema.tables.json", "}\n", 'utf-8');

      fs.writeFileSync("./data/reference/schema.tables.json", safeJsonStringify(allData, null, 2), 'utf8');
    });



function exampleToml(data1, data2) {
  const outData = {};
  if(data1 && data1.hasOwnProperty('properties')) {
    Object.entries(data1.properties).forEach(([key, value]) => {
      outData[key] = value.default || value.type || value.const || "";
    });
  }
  if(data2 && data2.hasOwnProperty('properties')) {
    Object.entries(data2.properties).forEach(([key, value]) => {
      outData[key] = value.default || value.type || value.const || "";
    });
  }
  return tomlify.toToml(outData, {space:2});
}
