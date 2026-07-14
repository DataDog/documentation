#!/usr/bin/env node
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');
const myArgs = process.argv.slice(2);
const input = (myArgs.length > 0) ? myArgs[0] : './data/reference/schema.json';
const output = (myArgs.length > 1) ? myArgs[1] : './data/reference/schema.deref.json';
const schemaTable = require('./build-reference-pages').schemaTable;
const filterExampleJson = require('./build-reference-pages').filterExampleJson;
const yaml = require('js-yaml');
const {split} = require("lodash/string");

if(!input || !output) {
  console.log("Missing input/outputs")
  process.exit(1);
}

// reading cue.json export
let s = fs.readFileSync('integrations_data/extracted/vector/cue.json', 'utf8');
let d = JSON.parse(s);

// write out vrl errors from cue
fs.writeFileSync(
    './data/reference/errors.json',
    safeJsonStringify(d["remap"]["errors"], null, 2),
    'utf8'
);

// write out vrl functions from cue
const funcsdata = {};
Object.entries(d["remap"])
  .filter(([key, value]) => ["functions"].includes(key))
  .forEach(([key, value]) => {
    //console.log(key, value);
    Object.entries(value).forEach(([itemKey, itemValue]) => {
      //console.log(itemKey, itemValue["category"]);
      if(!funcsdata.hasOwnProperty(itemValue["category"])) {
        funcsdata[itemValue["category"]] = [];
      }
      itemValue["examples"].map((ex) => {
        ex["return"] = JSON.stringify(ex["return"]);
        return ex;
      })
      funcsdata[itemValue["category"]].push(itemValue);
    });
  }
);
fs.writeFileSync(
    './data/reference/functions.json',
    safeJsonStringify(funcsdata, null, 2),
    'utf8'
);

if (!fs.existsSync(input)) {
    // just exist silently for now
    process.exit(0);
}
let fileString = fs.readFileSync(input, 'utf8');
fileString = fileString.replace('  "$ref": "#/definitions/vector::config::builder::ConfigBuilder",', '');
let fileData = JSON.parse(fileString);

let table = null;
$RefParser.dereference(fileData)
    .then((deref) => {

      // write dereferenced file from schema
      fs.writeFileSync(
            output,
            safeJsonStringify(deref, null, 2),
            'utf8'
        );

      // init our global data
      const allData = {"sources":[], "transforms":[], "sinks": []};

      // add to global data our processed components
      buildSection("vector::sources::Sources", deref, allData, ["file", "socket", "exec"]);
      buildSection("vector::transforms::Transforms", deref, allData, ["lua"]);
      buildSection("vector::sinks::Sinks", deref, allData, ["file", "websocket"]);

      // write it out to the file
      fs.writeFileSync("./data/reference/schema.tables.json", safeJsonStringify(allData, null, 2), 'utf8');
    });


function buildSection(specStr, deref, allData, componentsToSkip) {
  const skiplabels = ["Unit Test", "Unit Test Stream"];
  const specStrSplit = specStr.split('::');
  const name = specStrSplit[specStrSplit.length - 1].toLowerCase();
  allData[name] = [];
  const dataEntries = Object.entries(deref['definitions'][specStr]["oneOf"]);
  // const entryLen = dataEntries.length;
  dataEntries.forEach(([key, value]) => {
      if(!componentsToSkip.includes(value._metadata.logical_name.toLowerCase())) {
        const Sx = ("allOf" in value.allOf[0]) ? value.allOf[0].allOf[0] : value.allOf[0];
        const Sx2 = ("allOf" in value.allOf[0]) ? value.allOf[0].allOf[1] : value.allOf[0];
        let entryData = {
          "description1": value.description || "",
          "description2": value.allOf[0].description || "",
          "title": value.allOf[0].title || "",
          "metadata": value._metadata || {},
          "simple": yaml.dump(simpleExampleYaml(value.allOf), {lineWidth: -1, sortKeys:false}),
          "advanced": yaml.dump(advancedExampleYaml(value.allOf), {lineWidth: -1, sortKeys:false}),
          "html": {}
        };
        let lastChar = entryData.description1.slice(-1);
        if (lastChar === '.') {
          entryData.description1 = entryData.description1.slice(0, -1);
        }
        table = null;
        try {
          table = schemaTable("request", value.allOf[0], true);
        } catch (e) {
          console.log(`Couldn't created schematable for ${key} from file ${input} - ${e.message}, ${e.stack}`);
        }
        entryData["html"] = table;
        if(!skiplabels.includes(entryData["metadata"]["docs::label"]) && !skiplabels.includes(entryData["metadata"]["docs::human_name"])) {
          allData[name].push(entryData);
        }
      }
  });
}

function simpleExampleYaml(allOf) {
  let outData = {};
  const iter = (allOf instanceof Array) ? allOf : [allOf];
  iter.forEach((data) => {
    if(data && data.hasOwnProperty('properties')) {
      Object.entries(data.properties).forEach(([key, value]) => {
        let type = value.type;
        if(type instanceof Array) {
          type = value.type[0]
        }
        outData[key] = value.default || type || value.const || "";
      });
    } else if(data && data.hasOwnProperty('allOf')) {
      outData = {...outData, ...simpleExampleYaml([data.allOf[0]]) };
    }
  });
  return outData;
}

function advancedExampleYaml(allOf) {
  let outData = {};
  const iter = (allOf instanceof Array) ? allOf : [allOf];
  iter.forEach((data) => {
    if(data && data.hasOwnProperty('properties')) {
      Object.entries(data.properties).forEach(([key, value]) => {
        let type = value.type;
        if(type instanceof Array) {
          type = value.type[0]
        }
        outData[key] = value.default || type || value.const || "";
      });
    } else if(data && data.hasOwnProperty('allOf')) {
      outData = {...outData, ...simpleExampleYaml(data.allOf) };
    }
  });
  return outData;
}

function exampleYaml(data1, data2) {
  const outData = {};
  if(data1 && data1.hasOwnProperty('properties')) {
    Object.entries(data1.properties).forEach(([key, value]) => {
      let type = value.type;
      if(type instanceof Array) {
        type = value.type[0]
      }
      outData[key] = value.default || type || value.const || "";
    });
  }
  if(data2 && data2.hasOwnProperty('properties')) {
    Object.entries(data2.properties).forEach(([key, value]) => {
      let type = value.type;
      if(type instanceof Array) {
        type = value.type[0]
      }
      outData[key] = value.default || type || value.const || "";
    });
  }
  return yaml.dump(outData, {lineWidth: -1, sortKeys:false});
}
