#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');


async function updateApiSideNav(apiYaml, apiVersion) {
    const dereferencedObject = await $RefParser.dereference(apiYaml);
    fs.writeFileSync(
        `./data/api/${apiVersion}/full_spec_deref.json`,
        safeJsonStringify(dereferencedObject, null, 2),
        'utf8'
    );

    const menuYaml = yaml.safeLoad(
        fs.readFileSync('./config/_default/menus/menus.en.yaml', 'utf8')
    );

    const newMenuArray = [];

    for (let i = 0; i < apiYaml.tags.length; i += 1) {
        const tags = apiYaml.tags[i];

        const newDirName = slugify(tags.name, {
            lower: true,
            replacement: '-'
        });

        const indexFrontMatter = {
            title: tags.name
        };

        fs.mkdirSync(`./content/en/api/${apiVersion}/${newDirName}`, {
            recursive: true
        });

        let indexYamlStr = yaml.safeDump(indexFrontMatter);
        indexYamlStr = `---\n${indexYamlStr}---\n`;

        try {
            fs.writeFileSync(
                `./content/en/api/${apiVersion}/${newDirName}/_index.md`,
                indexYamlStr,
                'utf8'
            );
            console.log(
                `successfully wrote ./content/en/api/${apiVersion}/${newDirName}/_index.md`
            );
        } catch (err) {
            throw err;
        }

        // build resources for a page
        buildResources(dereferencedObject, `./content/en/api/${apiVersion}/${newDirName}/`, tags.name);

        const indexMenuObject = {
            name: tags.name,
            url: `/api/${apiVersion}/${slugify(tags.name, {
                lower: true,
                replacement: '-'
            })}/`,
            identifier: tags.name
        };

        newMenuArray.push(indexMenuObject);

        for (const [path, actions] of Object.entries(apiYaml.paths)) {
            for (const [key, action] of Object.entries(actions)) {
                if (tags.name === action.tags[0]) {
                    const childMenuObject = {
                        name: action.summary,
                        parent: tags.name,
                        url: slugify(action.summary, {
                            lower: true,
                            replacement: '-'
                        })
                    };

                    newMenuArray.push(childMenuObject);
                }
            }
        }
    }

    menuYaml[`api_${apiVersion}`] = newMenuArray;

    const newMenuYaml = yaml.dump(menuYaml, {
        lineWidth: -1
    });

    try {
        fs.writeFileSync(
            './config/_default/menus/menus.en.yaml',
            newMenuYaml,
            'utf8'
        );
        console.log(
            'successfully updated ./config/_default/menus/menus.en.yaml'
        );
    } catch (err) {
        throw err;
    }
}

/**
 * Quick helper to checks if path has a matching tag
 * @param {object} pathObj - object with path data
 * @param {string} tag - string with name of tag
 * returns boolean
 */
const isTagMatch = (pathObj, tag) => {
  const [firstActionName] = Object.keys(pathObj);
  return (pathObj[firstActionName].tags) ? pathObj[firstActionName].tags[0] === tag : false;
};


/**
 * Takes a schema requestBody or response and filters the data to be example worthy
 * It does this by order of preference of attributes "items" -> "example" -> "type"
 * @param {object} data - object schema
 * returns filtered data
 */
const filterExampleJson = (data) => {
  if("properties" in data) {
    return Object.keys(data.properties)
      .map((propKey) => {
        const property = data.properties[propKey];
        return {[propKey]: (property.hasOwnProperty("items")) ? filterExampleJson(property.items) : (property["example"] || property["type"])};
      })
      .reduce((obj, item) => ({...obj, ...item}), {});
  } else if ("items" in data) {
    return filterExampleJson(data.items);
  } else {
    return data["example"] || data["type"] || {};
  }
};


/**
 * Builds resources needed for a hugo api page
 * @param {object} dereferencedObject - deref object
 * @param {string} pageDir - page dir
 * @param {string} tagName - string name of tag
 */
const buildResources = (dereferencedObject, pageDir, tagName) => {
  const pageExampleJson = {};

  // just get this sections data
  const data = Object.keys(dereferencedObject.paths)
    .filter((path) => isTagMatch(dereferencedObject.paths[path], tagName))
    .map((path) => dereferencedObject.paths[path]);

  // build example json for request and each response
  data.forEach((actionObj) => {
    Object.entries(actionObj).forEach(([actionKey, action]) => {
      // set some default for this operationid entry default
      if(!(action.operationId in pageExampleJson)) {
        pageExampleJson[action.operationId] = {"responses":{}, "request": {}};
      }
      // add request json
      if(("requestBody" in action) && ("content" in action.requestBody) && ("application/json" in action.requestBody.content)) {
        pageExampleJson[action.operationId]["request"] = filterExampleJson(action.requestBody.content["application/json"].schema);
      }
      // add response json
      Object.entries(action.responses).forEach(([response_code, response]) => {
        if(("content" in response) && ("application/json" in response.content)) {
          pageExampleJson[action.operationId]["responses"][response_code] = filterExampleJson(response.content["application/json"].schema);
        }
      });
    });
  });

  fs.writeFileSync(`${pageDir}examples.json`, safeJsonStringify(pageExampleJson, null, 2), 'utf-8');
};


/**
 * Takes an array of spec file paths and processes them
 * @param {array} specs - array of strings with path to spec e.g ['./data/api/v2/full_spec.yaml']
 */
const processSpecs = (specs) => {
  specs
    .forEach((spec) => {
      const fileData = yaml.safeLoad(fs.readFileSync(spec, 'utf8'));
      const version = spec.split('/')[3];
      updateApiSideNav(fileData, version);
    });
};


const specs = ['./data/api/v1/full_spec.yaml', './data/api/v2/full_spec.yaml'];
processSpecs(specs);
