#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');


function updateApiSideNav(apiYaml, dereferencedObject, apiVersion) {

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
 * Takes an object from the schema and outputs markup for readonly fields
 * @param {string} value - the current schema object
 * returns html markup for indicating read only
 */
const readOnlyField = (value) => {
  let isReadOnly = false;
  if(typeof value === 'object') {
    if("readOnly" in value && value.readOnly) {
      isReadOnly = true;
    }
    if(value.type === 'array' && value.items.readOnly) {
      isReadOnly = true;
    }
  }
  return (isReadOnly) ? ' <span class="read-only">&#127361;</span>' : '';
};


/**
 * Takes an object from the schema and outputs a field column
 * @param {string} key - key for the current schema object
 * @param {object} value - part of a schema object
 * @param {object} toggleMarkup - optional markup to toggle nested rows
 * @param {string} requiredMarkup - optional markup for when the field is required
 * @param {string} parentKey - optional key of the parent object
 * returns html column
 */
const fieldColumn = (key, value, toggleMarkup, requiredMarkup, parentKey = '') => {
  let field = '';
  if(parentKey === "additionalProperties") {
    field = "&lt;any&#45;key&gt;";
  } else {
    if(['type'].includes(key) && (typeof value !== 'object')) {
      field = '';
    } else {
      field = (key || '');
    }
  }
  return `
    <div class="col-4 pl-0">
      <p class="key">${toggleMarkup}${field}${requiredMarkup}</p>
    </div>
  `;
};


/**
 * Takes an object from the schema and outputs a type column
 * @param {string} key - key for the current schema object
 * @param {object} value - part of a schema object
 * @param {string} readOnlyMarkup - optional markup for when the field is read only
 * returns html column
 */
const typeColumn = (key, value, readOnlyMarkup) => {
  const validKeys = ['type', 'format'];
  let typeVal = '';
  if(validKeys.includes(key) && (typeof value !== 'object')) {
    typeVal = value;
  } else {
    if(value.enum) {
      typeVal = 'enum';
    } else {
      typeVal = (value.format || value.type || '');
    }
  }
  if(value.type === 'array') {
    return `<div class="col-2"><p>[${value.items.type || ''}]${readOnlyMarkup}</p></div>`;
  } else {
    //return `<div class="col-2"><p>${validKeys.includes(key) ? value : (value.enum ? 'enum' : (value.format || value.type || ''))}${readOnlyMarkup}</p></div>`;
    return `<div class="col-2"><p>${typeVal}${readOnlyMarkup}</p></div>`;
  }
};


/**
 * Takes an object from the schema and outputs a description column
 * @param {object} value - part of a schema object
 * returns html column
 */
const descColumn = (value) => {
  const desc = (value.description && (typeof(value.description) !== "object")) ? value.description || '' : '';
  return `<div class="col-6"><p>${desc}</p></div>`;
};


/**
 * Takes a application/json schema for request or response and outputs a table
 * @param {object} data - schema object
 * @param {boolean} isNested - is this a nested row
 * @param {array} requiredFields - the required fields array of string to check
 * @param {number} level - how deep does the rabbit hole go?
 * returns html row with nested rows
 */
const rowRecursive = (data, isNested, requiredFields=[], level = 0, parentKey = '') => {
  let html = '';

  // i've set a hard recurse limit of depth
  if(level > 2) return '';

  if (typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {

      // calculate child data in advance
      // we do this here so that we can add classes to html with this knowledge
      let childData = null;
      let newParentKey = key;
      if(value.type === 'array') {
        if (value.items.properties) {
          childData = value.items.properties;
        }
      } else if(typeof value === 'object' && "properties" in value) {
        childData = value.properties;
      } else if (typeof value === 'object' && "additionalProperties" in value) {
        childData = value.additionalProperties;
        newParentKey = "additionalProperties";
      }

      // build up classes
      const classes = (isNested) ? "isNested d-none" : "";
      const moreclasses = (childData) ? "hasChildData" : "";

      // build markdown
      const toggleArrow = (childData) ? '<span class="js-collapse-trigger" style="cursor: pointer; font-size: 18px">></span> ' : "" ;
      const required = requiredFields.includes(key) ? '<span style="color:red;">*</span>' : "";
      const readOnly = readOnlyField(value);

      // build html
      html += `
      <div class="row ${classes} ${moreclasses}">
        <div class="col-12">
          <div class="row first-row">
            ${fieldColumn(key, value, toggleArrow, required, parentKey)}
            ${typeColumn(key, value, readOnly)}
            ${descColumn(value)}
          </div>
          ${(childData) ? rowRecursive(childData, true, data.required || [], (level + 1), newParentKey) : ''}
        </div>
      </div>
      `;
    });
  } else {
    html += `<div class="primitive">${data || ''}</div>`;
  }
  return html;
};


/**
 * Takes a application/json schema for request or response and outputs a table
 * @param {object} data - schema object
 * returns html table string
 */
const schemaTable = (data) => {
  return `
  <div class=" schema-table row">
    <div class="col-12 column">
      <div class="row">
        <div class="col-4 pl-0">
          <p class="font-semibold">Field</p>
        </div>
        <div class="col-2">
          <p class="font-semibold">Type</p>
        </div>
        <div class="col-6">
          <p class="font-semibold">Description</p>
        </div>
      </div>
      ${rowRecursive((data.type === 'array') ? (data.items.properties || data.items) : data.properties, false, data.required || [])}
    </div>  
  </div>`;
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
        pageExampleJson[action.operationId] = {"responses":{}, "request": {"json": {}, "html": ""}};
      }
      // add request json
      if(("requestBody" in action) && ("content" in action.requestBody) && ("application/json" in action.requestBody.content)) {
        pageExampleJson[action.operationId]["request"]["json"] = filterExampleJson(action.requestBody.content["application/json"].schema);
        const requestHTML = schemaTable(action.requestBody.content["application/json"].schema);
        if(requestHTML) {
          //fs.writeFileSync(`${pageDir}${action.operationId}_request.html`, requestHTML, 'utf-8');
          pageExampleJson[action.operationId]["request"]["html"] = requestHTML;
          console.log(`successfully wrote ${pageDir}${action.operationId}_request.html`);
        }
      }
      // add response json
      Object.entries(action.responses).forEach(([response_code, response]) => {
        if(("content" in response) && ("application/json" in response.content)) {
          pageExampleJson[action.operationId]["responses"][response_code] = {"json": {}, "html": ""};
          pageExampleJson[action.operationId]["responses"][response_code]["json"] = filterExampleJson(response.content["application/json"].schema);
          const responseHTML = schemaTable(response.content["application/json"].schema);
          if(responseHTML) {
            //fs.writeFileSync(`${pageDir}${action.operationId}_response_${response_code}.html`, responseHTML, 'utf-8');
            pageExampleJson[action.operationId]["responses"][response_code]["html"] = responseHTML;
            console.log(`successfully wrote ${pageDir}${action.operationId}_response_${response_code}.html`);
          }
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
      $RefParser.dereference(fileData)
        .then((deref) => {
          const version = spec.split('/')[3];
          fs.writeFileSync(
              `./data/api/${version}/full_spec_deref.json`,
              safeJsonStringify(deref, null, 2),
              'utf8'
          );
          updateApiSideNav(fileData, deref, version);
        }).catch((e) => console.log(e));
    });
};

const specs = ['./data/api/v1/full_spec.yaml', './data/api/v2/full_spec.yaml'];
processSpecs(specs);
