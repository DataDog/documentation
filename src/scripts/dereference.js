const yaml = require('js-yaml');
const fs = require('fs');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const options = {
    // parse: {
    //     json: false, // Disable the JSON parser
    //     yaml: {
    //         allowEmpty: false // Don't allow empty YAML files
    //     },
    //     text: {
    //         canParse: ['.txt', '.html'], // Parse .txt and .html files as plain text (strings)
    //         encoding: 'utf16' // Use UTF-16 encoding
    //     }
    // },
    // resolve: {
    //     file: true, // Don't resolve local file references
    //     http: {
    //         timeout: 2000, // 2 second timeout
    //         withCredentials: true // Include auth credentials when resolving HTTP references
    //     }
    // },
    dereference: {
        circular: true // Don't allow circular $refs
    }
};

$RefParser
    .dereference('./data/api/v1/full_spec.yaml', options)
    .then(schema => {
        
        // console.log('schema: ', schema.components.schemas);

        const newMenuYaml = yaml.dump(schema, {
            lineWidth: -1
        });

        try {
            fs.writeFileSync(
                './data/api/v1/full_spec_deref.yaml',
                newMenuYaml,
                'utf8'
            );
            console.log('successfully deferenced yaml file.');
        } catch (err) {
            throw err;
        }
    })
    .catch(err => {
        console.log(err);
    });
