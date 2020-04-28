#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const marked = require('marked');
const slugify = require('slugify');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');


/**
 * Update the menu yaml file with api
 * @param {object} apiYaml - object with data
 * @param {string} apiVersion - string with version e.g v1
 */
const updateMenu = (apiYaml, apiVersion) => {
  const currentMenuYaml = yaml.safeLoad(fs.readFileSync('./config/_default/menus/menus.en.yaml', 'utf8'));
  const newMenuArray = [];

  apiYaml.tags.forEach((tag) => {

    newMenuArray.push({
      name: tag.name,
      url: `/api/${apiVersion}/${getTagSlug(tag.name)}/`,
      identifier: tag.name
    });

    // just get this sections data
    Object.keys(apiYaml.paths)
      .filter((path) => isTagMatch(apiYaml.paths[path], tag.name))
      .map((path) => Object.values(apiYaml.paths[path]))
      .reduce((obj, item) => ([...obj, ...item]), [])
      .forEach((action) => {
        newMenuArray.push({
          name: action.summary,
          parent: tag.name,
          url: slugify(action.summary, {lower: true, replacement: '-'})
        });
    });

  });

  // generate new yaml menu
  currentMenuYaml[`api_${apiVersion}`] = newMenuArray;
  const newMenuYaml = yaml.dump(currentMenuYaml, {lineWidth: -1});

  // save new yaml menu
  fs.writeFileSync('./config/_default/menus/menus.en.yaml', newMenuYaml, 'utf8');
  console.log(`successfully updated ${apiVersion} ./config/_default/menus/menus.en.yaml`);
};


/**
 * Create api markdown section pages
 * @param {object} apiYaml - object with data
 * @param {object} deref - object with data dereferenced
 * @param {string} apiVersion - string with version e.g v1
 */
const createPages = (apiYaml, deref, apiVersion) => {

  apiYaml.tags.forEach((tag) => {
    // make directory
    const newDirName = getTagSlug(tag.name);
    fs.mkdirSync(`./content/en/api/${apiVersion}/${newDirName}`, {recursive: true});

    // make frontmatter
    const indexFrontMatter = {title: tag.name};
    let indexYamlStr = yaml.safeDump(indexFrontMatter);
    indexYamlStr = `---\n${indexYamlStr}---\n`;

    // build page
    fs.writeFileSync(`./content/en/api/${apiVersion}/${newDirName}/_index.md`, indexYamlStr, 'utf8');
    console.log(`successfully wrote ./content/en/api/${apiVersion}/${newDirName}/_index.md`);
  });

};


/**
 * Create resources per page, json example and html tables
 * @param {object} apiYaml - object with data
 * @param {object} deref - object with data dereferenced
 * @param {string} apiVersion - string with version e.g v1
 */
const createResources = (apiYaml, deref, apiVersion) => {

  apiYaml.tags.forEach((tag) => {
    const jsonData = {};
    const newDirName = getTagSlug(tag.name);
    const pageDir = `./content/en/api/${apiVersion}/${newDirName}/`;

    // just get this sections data
    const data = Object.keys(deref.paths)
      .filter((path) => isTagMatch(deref.paths[path], tag.name))
      .map((path) => deref.paths[path]);

    // build example json for request and each response
    data.forEach((actionObj) => {
      Object.entries(actionObj).forEach(([actionKey, action]) => {

        // request
        let request;
        if(action.requestBody) {
          const requestSchema = getSchema(action.requestBody.content);
          const requestJson = filterExampleJson(requestSchema);
          const requestHtml = schemaTable("request", requestSchema);
          request = {"json": requestJson, "html": requestHtml};
          console.log(`successfully wrote ${pageDir}${action.operationId} html`);
        }

        // responses
        const responses = {};
        Object.entries(action.responses).forEach(([responseCode, response]) => {
            if(response.content) {
              const responseSchema = getSchema(response.content);
              const responseJson = filterExampleJson(responseSchema);
              const responseHtml = schemaTable("response", responseSchema);
              responses[responseCode] = {"json": responseJson, "html": responseHtml};
              console.log(`successfully wrote ${pageDir}${action.operationId}_response_${responseCode} html`);
            }
        });

        // assign built up data for examples.json
        jsonData[action.operationId] = {"responses":responses, "request": request || {"json": {}, "html": ""}};
      });
    });

    fs.writeFileSync(`${pageDir}examples.json`, safeJsonStringify(jsonData, null, 2), 'utf-8');
  });

};


/**
 * Get the schema regardless of the content type
 * @param {object} content - object with content types
 * returns object with schema
 */
const getSchema = (content) => {
  const contentTypeKeys = Object.keys(content);
  const [firstContentType] = contentTypeKeys;
  return content[firstContentType].schema;
};


/**
 * Quick helper to encapsulate the slugify options for tagname
 * @param {object} tagName - string of tag name
 * returns string with tag slugified
 */
const getTagSlug = (tagName) => {
  return slugify(tagName, {lower: true, replacement: '-'});
};


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
        return {[propKey]: (property.hasOwnProperty("items")) ? [filterExampleJson(property.items)] : (property["example"] || property["type"])};
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
const isReadOnlyRow = (value) => {
  let isReadOnly = false;
  if(typeof value === 'object') {
    if("readOnly" in value && value.readOnly) {
      isReadOnly = true;
    }
    if(value.type === 'array' && ("items" in value && value.items.readOnly)) {
      isReadOnly = true;
    }
  }
  return isReadOnly;
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
  if(['type'].includes(key) && (typeof value !== 'object')) {
    field = '';
  } else {
    field = (key || '');
  }
  return `
    <div class="col-4 column">
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
  } else if(value.enum) {
      typeVal = 'enum';
    } else {
      typeVal = (value.format || value.type || '');
    }
  if(value.type === 'array') {
    return `<div class="col-2 column"><p>[${value.items.type || ''}]${readOnlyMarkup}</p></div>`;
  } else {
    // return `<div class="col-2"><p>${validKeys.includes(key) ? value : (value.enum ? 'enum' : (value.format || value.type || ''))}${readOnlyMarkup}</p></div>`;
    return `<div class="col-2 column"><p>${typeVal}${readOnlyMarkup}</p></div>`;
  }
};


/**
 * Takes an object from the schema and outputs a description column
 * @param {string} key - key for the current schema object
 * @param {object} value - part of a schema object
 * returns html column
 */
const descColumn = (key, value) => {
  let desc = '';
  if(value.description) {
    if(typeof(value.description) !== "object") {
      desc = value.description || '';
    }
  } else if((typeof(value) === "string") && key === 'description') {
    desc = value || '';
  }
  return `<div class="col-6 column">${marked(desc) ? marked(desc).trim() : ""}</div>`.trim();
};


/**
 * Takes a application/json schema for request or response and outputs a table
 * @param {string} tableType - string 'request' or 'response'
 * @param {object} data - schema object
 * @param {boolean} isNested - is this a nested row
 * @param {array} requiredFields - the required fields array of string to check
 * @param {number} level - how deep does the rabbit hole go?
 * returns html row with nested rows
 */
const rowRecursive = (tableType, data, isNested, requiredFields=[], level = 0, parentKey = '') => {
  let html = '';

  // i've set a hard recurse limit of depth
  if(level > 10) return '';

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
          // check if `additionalProperties` is an empty object
          if(Object.keys(value.additionalProperties).length !== 0){
            childData = {["&lt;any-key&gt;"]: value.additionalProperties};
            newParentKey = "additionalProperties";
          }
        }

        const isReadOnly = isReadOnlyRow(value);

        // build up row classes
        const outerRowClasses = `${(isNested) ? "isNested d-none" : ""} ${(childData) ? "hasChildData" : ""} ${(isReadOnly) ? "isReadOnly" : ""}`;
        const nestedRowClasses = `first-row ${(childData) ? "js-collapse-trigger collapse-trigger" : ""} ${(isReadOnly) ? "isReadOnly" : ""}`;

        // build markdown
        const toggleArrow = (childData) ? '<span class="toggle-arrow"><svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.7294 4.45711L0.733399 7.82311L1.1294 8.29111L5.6654 4.45711L1.1294 0.641113L0.751398 1.12711L4.7294 4.45711Z" fill="black"/></svg></span> ' : "" ;
        const required = requiredFields.includes(key) ? '<span style="color:red;">*</span>' : "";
        const readOnlyField = (isReadOnly) ? '' : '';

        // build html
        html += `
        <div class="row ${outerRowClasses}">
          <div class="col-12 first-column">
            <div class="row ${nestedRowClasses}">
              ${fieldColumn(key, value, toggleArrow, required, parentKey)}
              ${typeColumn(key, value, readOnlyField)}
              ${descColumn(key, value)}
            </div>
            ${(childData) ? rowRecursive(tableType, childData, true, data.required || [], (level + 1), newParentKey) : ''}
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
 * @param {string} tableType - 'request' or 'response'
 * @param {object} data - schema object
 * returns html table string
 */
const schemaTable = (tableType, data) => `
  <div class="table-${tableType} schema-table row">
    <p class="expand-all js-expand-all text-primary">Expand All</p>
    <div class="col-12">
      <div class="row table-header">
        <div class="col-4 column">
          <p class="font-semibold">Field</p>
        </div>
        <div class="col-2 column">
          <p class="font-semibold">Type</p>
        </div>
        <div class="col-6 column">
          <p class="font-semibold">Description</p>
        </div>
      </div>
      ${rowRecursive(tableType, (data.type === 'array') ? (data.items.properties || data.items) : data.properties, false, data.required || [])}
    </div>  
  </div>`;


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
          updateMenu(fileData, version);
          createPages(fileData, deref, version);
          createResources(fileData, deref, version);
        }).catch((e) => console.log(e));
    });
};


const init = () => {
  const specs = ['./data/api/v1/full_spec.yaml', './data/api/v2/full_spec.yaml'];
  processSpecs(specs);
};

module.exports = {
  init,
  isTagMatch,
  isReadOnlyRow,
  descColumn,
  fieldColumn,
  typeColumn,
  schemaTable,
  rowRecursive
};

