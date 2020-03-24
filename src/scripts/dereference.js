const yaml = require('js-yaml');
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');



const options = {
    // dereference: {
    //     circular: "ignore"
    // }
};

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

const apiV1FullSpecYaml = './data/api/v1/full_spec.yaml';
const apiV2FullSpecYaml = './data/api/v2/full_spec.yaml';

async function dereference(apiYaml, apiVersion) {
    try {
        const dereferencedObject = await $RefParser.dereference(apiYaml, options);

        // const safeJSON = safeJsonStringify(dereferencedObject);

        const safeJSON = JSON.stringify(dereferencedObject, getCircularReplacer(), 2);

        // console.log('dereferencedYaml: ', stringify(dereferencedObject))

        // const newYaml = yaml.safeDump(JSON.parse(safeJSON), {
        //     lineWidth: -1
        // });

        // const newYaml = yaml.safeDump(dereferencedObject, {
        //     lineWidth: -1
        // });

        // fs.writeFileSync(
        //     `./data/api/${apiVersion}/full_spec_deref.yaml`,
        //     newYaml,
        //     'utf8'
        // );

        fs.writeFileSync(
            `./data/api/${apiVersion}/full_spec_deref.json`,
            safeJsonStringify(dereferencedObject),
            'utf8'
        );

        // fs.writeFileSync(
        //     `./data/api/${apiVersion}/full_spec_deref.json`,
        //     JSON.stringify(dereferencedObject),
        //     'utf8'
        // );
        console.log('successfully deferenced yaml file.');
    } catch (err) {
        throw err;
    }
}

dereference(apiV1FullSpecYaml, 'v1');
dereference(apiV2FullSpecYaml, 'v2');
