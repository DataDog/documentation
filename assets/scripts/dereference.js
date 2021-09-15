const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');

const apiV1FullSpecYaml = './data/api/v1/full_spec.yaml';
const apiV2FullSpecYaml = './data/api/v2/full_spec.yaml';

async function dereference(apiYaml, apiVersion) {
    try {
        const dereferencedObject = await $RefParser.dereference(apiYaml);

        fs.writeFileSync(
            `./data/api/${apiVersion}/full_spec_deref.json`,
            safeJsonStringify(dereferencedObject, null, 2),
            'utf8'
        );

        console.log(`successfully deferenced ${apiYaml}`);
    } catch (err) {
        throw err;
    }
}

dereference(apiV1FullSpecYaml, 'v1');
dereference(apiV2FullSpecYaml, 'v2');
