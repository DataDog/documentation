#!/usr/bin/env node
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');

let fileData = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
const yData = JSON.stringify(fileData["types"]["$defs"]).replace(/\#\/\$defs\//g, '#/types/$defs/');
fileData["types"]["$defs"] = JSON.parse(yData);

$RefParser.dereference(fileData)
    .then((deref) => {

    });
