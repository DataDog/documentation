#!/usr/bin/env node
const lodash = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');
const marked = require('marked');
const slugify = require('slugify');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const safeJsonStringify = require('safe-json-stringify');

const supportedLangs = ['en'];

/**
 * Update the menu yaml file with api
 * @param {object} apiYaml - object with data
 * @param {string} apiVersion - string with version e.g v1
 */
const updateMenu = (specData, specs, languages) => {

  languages.forEach((language) => {
    const currentMenuYaml = yaml.safeLoad(fs.readFileSync(`./config/_default/menus/menus.${language}.yaml`, 'utf8'));

  // filter out auto generated menu items so we just have hardcoded ones
  const newMenuArray = (currentMenuYaml[`api`] || []).filter((entry => !entry.hasOwnProperty("generated")));

  specData.forEach((apiYaml, index) => {
    const apiVersion = specs[index].split('/')[3];
    // now add back in all the auto generated menu items from specs
    apiYaml.tags.forEach((tag) => {

      const existingMenuItemIndex = newMenuArray.findIndex((i) => i.identifier === getTagSlug(tag.name));
      if(existingMenuItemIndex > -1) {
        // already exists
        // newMenuArray[existingMenuItemIndex].params["versions"].push()
      } else {
        // doesn't exist lets add it
        newMenuArray.push({
          name: tag.name,
          url: (language === 'en' ? `/api/latest/${getTagSlug(tag.name)}/` : `/${language}/api/latest/${getTagSlug(tag.name)}/` ),
          identifier: getTagSlug(tag.name),
          generated: true
        });
      }

      // just get this sections data
      Object.keys(apiYaml.paths)
        .filter((path) => isTagMatch(apiYaml.paths[path], tag.name))
        .map((path) => Object.values(apiYaml.paths[path]))
        .reduce((obj, item) => ([...obj, ...item]), [])
        .forEach((action) => {

          const existingSubMenuItemIndex = newMenuArray.findIndex((i) => i.identifier === getTagSlug(action.summary));
          if(existingSubMenuItemIndex > -1) {
            // already exists
            const existingParams = newMenuArray[existingSubMenuItemIndex].params;
            if(!existingParams["versions"].includes(apiVersion)) {
              newMenuArray[existingSubMenuItemIndex].params["versions"].push(apiVersion);
            }
            if(!existingParams["operationids"].includes(action.operationId)) {
              newMenuArray[existingSubMenuItemIndex].params["operationids"].push(action.operationId);
            }
            if(!existingParams["unstable"].includes(apiVersion) && action.hasOwnProperty("x-unstable")) {
              newMenuArray[existingSubMenuItemIndex].params["unstable"].push(apiVersion);
            }
          } else {
            // instead of push we need to insert after last parent: tag.name
            const indx = newMenuArray.findIndex((i) => i.identifier === getTagSlug(tag.name));
            const item = {
              name: action.summary,
              url: `#` + getTagSlug(action.summary),
              identifier: `${getTagSlug(action.summary)}`,
              parent: getTagSlug(tag.name),
              generated: true,
              params: {
                "versions": [apiVersion],
                "operationids": [`${action.operationId}`],
                "unstable": action.hasOwnProperty("x-unstable") ? [apiVersion] : []
              }
            };
            newMenuArray.splice(indx + 1, 0, item);
          }
      });

    });
  });



  // generate new yaml menu
  currentMenuYaml[`api`] = newMenuArray;
  const newMenuYaml = yaml.dump(currentMenuYaml, {lineWidth: -1});

  // save new yaml menu
  fs.writeFileSync(`./config/_default/menus/menus.${language}.yaml`, newMenuYaml, 'utf8');
  console.log(`successfully updated ./config/_default/menus/menus.${language}.yaml`);
  })


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

    // make version frontmatter
    const baseFrontMatter = {title: tag.name};
    const indexFrontMatter = {...baseFrontMatter, headless: true};
    let indexYamlStr = yaml.safeDump(indexFrontMatter);
    indexYamlStr = `---\n${indexYamlStr}---\n`;

    // build page
    fs.writeFileSync(`./content/en/api/${apiVersion}/${newDirName}/_index.md`, indexYamlStr, 'utf8');

    // create a copy in /latest/
    indexYamlStr = yaml.safeDump(baseFrontMatter);
    indexYamlStr = `---\n${indexYamlStr}---\n`;
    fs.mkdirSync(`./content/en/api/latest/${newDirName}`, {recursive: true});
    fs.writeFileSync(`./content/en/api/latest/${newDirName}/_index.md`, indexYamlStr, 'utf8');

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
          const requestJson = filterExampleJson("request", requestSchema);
          const requestCurlJson = filterExampleJson("curl", requestSchema);
          const requestHtml = schemaTable("request", requestSchema);
          request = {"json_curl": requestCurlJson, "json": requestJson, "html": requestHtml};
          console.log(`successfully wrote ${pageDir}${action.operationId} html`);
        }

        // responses
        const responses = {};
        Object.entries(action.responses).forEach(([responseCode, response]) => {
            if(response.content) {
              const responseSchema = getSchema(response.content);
              const responseJson = filterExampleJson("response", responseSchema);
              const responseHtml = schemaTable("response", responseSchema);
              responses[responseCode] = {"json": responseJson, "html": responseHtml};
              console.log(`successfully wrote ${pageDir}${action.operationId}_response_${responseCode} html`);
            }
        });

        // assign built up data for examples.json
        jsonData[action.operationId] = {responses, "request": request || {"json_curl": {}, "json": {}, "html": ""}};
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
  contentTypeKeys.forEach((key) => {
    if(key.startsWith("application/json")) {
      return content[key].schema;
    }
  });
  return content[firstContentType].schema;
};


/**
 * Quick helper to encapsulate the slugify options for tagname
 * @param {object} tagName - string of tag name
 * returns string with tag slugified
 */
const getTagSlug = (tagName) => slugify(tagName, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g});


/**
 * Quick helper to checks if path has a matching tag
 * @param {object} pathObj - object with path data
 * @param {string} tag - string with name of tag
 * returns boolean
 */
const isTagMatch = (pathObj, tag) => {
  const [firstActionName] = Object.keys(pathObj);
  return (firstActionName && pathObj[firstActionName].tags) ? pathObj[firstActionName].tags[0] === tag : false;
};


/**
 * The recursively called filtering json function, will build up a json string
 * @param {string} actionType - string of 'request' or 'response' or 'curl'
 * @param {object} data - the schema object
 * @param {object} parentExample - the example object adjacent to data passed in
 * @param {object} requiredKeys - []
 * @param {number} level - the depth of recursion
 * returns string
 */
const filterJson = (actionType, data, parentExample = null, requiredKeys = [], level = 0) => {
  let jsondata = '';
  let iterationHasRequiredKeyMatches = false;
  let childRequiredKeys = [];

  // i've set a hard recurse limit of depth
  if(level > 10) return [jsondata, iterationHasRequiredKeyMatches];

  if (typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {

      if(actionType === "curl") {
        if(requiredKeys.length <= 0 || !requiredKeys.includes(key)) {
          iterationHasRequiredKeyMatches = false;
        } else {
          iterationHasRequiredKeyMatches = true;
        }
      }

      if(actionType === "request" && value.readOnly) {
        // skip
      } else if(actionType === "curl" && value.readOnly) {
        // skip
      } else {

        let prefixType = '';
        let suffixType = '';

        if (value.example) {
          if (typeof value.example === 'object') {
            prefixType = '[';
            suffixType = ']';
          }
        }

        // calculate child data in advance
        // we do this here so that we can add classes to html with this knowledge
        let childData = null;
        let newParentKey = key;
        if (value.type === 'array') {
          if (typeof value.items === 'object') {
            if (value.items.properties) {
              childData = value.items.properties;
              childRequiredKeys = (value.items.required) ? value.items.required : [];
              prefixType = '[{';
              suffixType = '}]';

              // widgets
              /*
              if("definition" in value.items.properties && "oneOf" in value.items.properties.definition) {
                // childData = value.items.properties.definition.oneOf;
                const names = value.items.properties.definition.oneOf.map((item) => item.properties.type.default);
                childData = names
                  .map((mapkey, indx) => { return {[mapkey]: value.items.properties.definition.oneOf[indx]} })
                  .reduce((obj, item) => ({...obj, ...item}), {});
                childRequiredKeys = [];
              }*/
            }

            // for items -> oneOf
            if (value.items.oneOf && value.items.oneOf instanceof Array && value.items.oneOf.length < 20) {
              // if we have an example use that otherwise choose the first one oneof
              if(!parentExample) {
                if (Object.keys(value.items.oneOf).length !== 0) {
                  childData = ("properties" in value.items.oneOf[0]) ? value.items.oneOf[0].properties : value.items.oneOf[0];
                  prefixType = '[{';
                  suffixType = '}]';
                }
              }
            }
          } else if (typeof value.items === 'string') {
            childRequiredKeys = (value.items.required) ? value.items.required : [];
            if (value.items === '[Circular]') {
              childData = null;
            }
          }
        } else if (typeof value === 'object' && "properties" in value) {
          childData = value.properties;
          childRequiredKeys = (value.required) ? value.required : [];
          prefixType = '{';
          suffixType = '}';
        } else if (typeof value === 'object' && "additionalProperties" in value) {
          // check if `additionalProperties` is an empty object
          if (Object.keys(value.additionalProperties).length !== 0) {
            childData = {"<any-key>": value.additionalProperties};
            prefixType = '{';
            suffixType = '}';
            newParentKey = "additionalProperties";
          }
        } else if (typeof value === 'object' && "oneOf" in value) {
          // if we have an example use that otherwise choose the first one oneof
          if(!parentExample) {
            if (Object.keys(value.oneOf).length !== 0) {
              childData = ("properties" in value.oneOf[0]) ? value.oneOf[0].properties : value.oneOf[0];
              prefixType = '{';
              suffixType = '}';
            }
          }
        }

        // choose the example to use
        // parent -> current level -> one deep
        let chosenExample = parentExample;
        if (typeof value.example !== 'undefined') {
          chosenExample = value.example;
        } else if (value.items && typeof value.items.example !== 'undefined') {
          chosenExample = value.items.example;
          prefixType = '[';
          suffixType = ']';
        }

        if (childData) {
          const [jstring, childRequiredKeyMatches] = filterJson(actionType, childData, value.example, childRequiredKeys, (level + 1));
          iterationHasRequiredKeyMatches = iterationHasRequiredKeyMatches || childRequiredKeyMatches;
          if(actionType === "curl" && !iterationHasRequiredKeyMatches) {
            // skip output
          } else {
            jsondata += `"${key}": ${prefixType}${jstring}${suffixType},`;
          }
        } else {
          let ex = '';
          // bool causes us to not go in here so check for it
          ex = outputExample(chosenExample, key);
          if(actionType === 'curl') {
            ex = ex || null;
          } else {
            ex = ex || outputValueType(value.type, value.format);
          }
          if(actionType === "curl" && !iterationHasRequiredKeyMatches) {

          } else {
            jsondata += `"${key}": ${prefixType}${ex}${suffixType},`;
          }
        }
      }

    });
  } else {
    // no data just parent example
    const ex = outputExample(parentExample);
    if(ex) {
      jsondata += `${ex}`;
    }
  }

  if(jsondata.length > 0) {
    iterationHasRequiredKeyMatches = true;
  }
  const lastChar = jsondata.slice(-1);
  if (lastChar === ',') {
      return [jsondata.slice(0, -1), iterationHasRequiredKeyMatches];
  } else {
      return [jsondata, iterationHasRequiredKeyMatches];
  }
};

/**
 * Takes a value.type string and returns appropriate representation
 * NOTE: These are types as they come through in the schema
 * e.g array should be []
 * @param {object} valueType - string of type
 * @param {object} format - value type formatting e.g int32, int64, date-time
 * returns formatted string
 */
const outputValueType = (valueType, format = "") => {
  const ipoDate = new Date('19 September 2019 10:00 UTC');
  switch(valueType) {
    case "array":
      return "[]";
    case "object":
      return "{}";
    case "boolean":
      return "false";
    case "integer":
    case "string":
    default:
      return (format === "date-time") ? `"${ipoDate.toISOString()}"` : `"${valueType}"`;
  }
};


/**
 * Takes a value we are straight up trying to output and determines if we should wrap with quotes or not
 * NOTE: These are javascript types retrieved through typeof
 * e.g { key: value } or {key: [value, value]}
 * @param {any} value can be of any type
 * @param {boolean} trailingComma if it should have a , on the end. Useful for arrays
 * returns formatted value for json
 */
const outputValue = (value, trailingComma = false) => {
  const t = typeof value;
  let out;
  switch(t) {
    case "boolean":
    case "bigint":
    case "number":
      out = `${value}`;
      break;
    case "string":
      out = `"${value.replace(/\r?\n|\r/g, '\\n')}"`;
      break;
    default:
      out = `"${value}"`;
  }
  return (trailingComma) ? `${out},` : out;
};

/**
 * Takes a chosen example object and formats it appropriately
 * @param {any} chosenExample - object schema
 * @param {string} inputkey - string key
 * returns formatted string
 */
const outputExample = (chosenExample, inputkey) => {
  let ex = '';
  if(typeof chosenExample !== 'undefined' && chosenExample !== null) {
    if(chosenExample instanceof Array) {
      // if array of strings use them
      // if array of objects try match keys
      chosenExample.forEach((item, key, arr) => {
        if(item instanceof Array) {
          // if nested array pass back through
          ex = `[${outputExample(item, inputkey)}]`;
        } else if(typeof item === 'object') {
          // output 1 level of example array
          if(inputkey && inputkey in item) {
            ex = outputValue(item[inputkey]);
          }
        } else {
          ex += outputValue(item, true);
          if (Object.is(arr.length - 1, key)) {
            ex = ex.slice(0, -1);
          }
        }
      });
    } else if(typeof chosenExample === 'object') {
      if(chosenExample.value instanceof Array) {
        chosenExample.value.forEach((item, key, arr) => {
          ex += outputValue(item, true);
          if (Object.is(arr.length - 1, key)) {
            ex = ex.slice(0, -1);
          }
        });
      }
    } else {
      ex = outputValue(chosenExample);
    }
  }
  return ex;
};

/**
 * Takes a data object and returns if we should wrap with [ ] or {} for jsons tring output
 * @param {object} data - object schema
 * returns array of 2 characters one for before one for after e.g ['{', '}'] or ['[', ']']
 */
const getJsonWrapChars = (data) => {
  let prefixType = "{";
  let suffixType = "}";

  if(data) {
    if (data.type === 'array') {
      if (data.items.type === 'array') {
        prefixType = "[[{";
        suffixType = "}]]";
      } else if (data.items.properties) {
        //
      } else {
        prefixType = "[";
        suffixType = "]";
      }
    }
  }
  return [prefixType, suffixType];
};


/**
 * Takes a data object and returns the initial child data to be passed for recursion to filterjson
 * @param {object} data - object schema
 * returns initial data
 */
const getInitialJsonData = (data) => {
  let initialData;
  if(data) {
    if (data.type === 'array') {
      if (data.items.type === 'array') {
        initialData = data.items.items.properties;
      } else if (data.items.properties) {
        initialData = data.items.properties;
      }
    } else if(data.oneOf && data.oneOf.length > 0) {
      initialData = data.oneOf[0].properties;
    } else {
      initialData = data.properties;
    }
  }
  return initialData;
};

/**
 * Takes a data object and returns the initial child data to be passed for recursion to filterjson
 * @param {object} data - object schema
 * returns initial data
 */
const getInitialExampleJsonData = (data) => {
  let selectedExample;
  if(data) {
    if (data.type === 'array') {
      if (data.items.type === 'array') {
        selectedExample = data.items.items.example;
      } else if (data.items.properties) {
        selectedExample = data.items.example;
      } else {
        selectedExample = data.example;
      }
    } else {
      selectedExample = data.example;
    }
  }
  return selectedExample;
};


/**
 * Takes a data object and returns the initial child data to be passed for recursion to filterjson
 * @param {object} data - object schema
 * returns initial data
 */
const getInitialRequiredData = (data) => {
  let requiredKeys = [];
  if(data) {
    if (data.type === 'array') {
      if (data.items.type === 'array') {
        requiredKeys = data.items.items.required;
      } else if (data.items.properties) {
        requiredKeys = data.items.required;
      }
    } else {
      requiredKeys = data.required;
    }
  }
  return requiredKeys || [];
};


/**
 * Takes a data object and returns the initial child data to be passed for recursion to filterjson
 * @param {string} actionType - string of 'request' or 'response' or 'curl'
 * @param {object} data - the schema object
 * returns parsed json object from built string
 */
const filterExampleJson = (actionType, data) => {
  const [prefix, suffix] = getJsonWrapChars(data);
  const initialData = getInitialJsonData(data);
  const selectedExample = getInitialExampleJsonData(data);
  const requiredKeys = getInitialRequiredData(data);

  // just return the example in additionalProperties cases with example
  if(data.additionalProperties && data.example) {
    return data.example;
  }

  const [jString, b] = filterJson(actionType, initialData, selectedExample, requiredKeys);
  const output = `${prefix}
    ${jString}
  ${suffix}`.trim();
  let parsed = '';
  try {
      parsed = JSON.parse(output);
  } catch(e) {
      console.log(e);
      console.log(output);
  }
  return parsed;
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
  if(['type'].includes(key) && (typeof value !== 'object') && (key !== "&lt;any-key&gt;")) {
    field = '';
  } else {
    field = (key || '');
  }
  return `
    <div class="col-4 column">
      <p class="key">${toggleMarkup}${field}${requiredMarkup}</p>
    </div>
  `.trim();
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
  let oneOfLabel = "";
  if(typeof value === 'object' && "oneOf" in value) {
    // oneof label if properties -> oneOf
    oneOfLabel = "&nbsp;&lt;oneOf&gt;";
  } else if(value.type === 'array' && typeof value.items === 'object' && "oneOf" in value.items) {
    // oneof label if items -> oneOf
    oneOfLabel = "&nbsp;&lt;oneOf&gt;";
  } else {
    oneOfLabel = "";
  }
  if(validKeys.includes(key) && (typeof value !== 'object')) {
    typeVal = value;
  } else if(value.enum) {
      typeVal = 'enum';
    } else {
      typeVal = (value.format || value.type || '');
    }
  if(value.type === 'array') {
    return `<div class="col-2 column"><p>[${(value.items === '[Circular]') ? 'object' : (value.items.type || '')}${oneOfLabel}]${readOnlyMarkup}</p></div>`;
  } else {
    // return `<div class="col-2"><p>${validKeys.includes(key) ? value : (value.enum ? 'enum' : (value.format || value.type || ''))}${readOnlyMarkup}</p></div>`;
    return `<div class="col-2 column"><p>${typeVal}${oneOfLabel}${readOnlyMarkup}</p></div>`.trim();
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
    if (value.enum){
      desc = `${value.description  } \nAllowed enum values: <code>${value.enum}</code>`;
    } else if(typeof(value.description) !== "object") {
      desc = value.description || '';
    }
  } else if((typeof(value) === "string") && key === 'description') {
    desc = value || '';
  }
  if(value.deprecated) {
    desc = `**DEPRECATED**: ${desc}`;
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
  let newRequiredFields;

  // data.required must be an array of required fields e.g ['foo', 'bar']
  // if its not then we possible have a field called required that is actually an object
  // and we don't want this so pass in previous requirements
  if(data.required && data.required instanceof Array) {
    newRequiredFields = data.required;
  } else {
    newRequiredFields = requiredFields;
  }

  // i've set a hard recurse limit of depth
  if(level > 10) return '';

    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {

        // calculate child data in advance
        // we do this here so that we can add classes to html with this knowledge
        let childData = null;
        let newParentKey = key;
        if(value.type === 'array') {
          if(typeof value.items === 'object') {
            if (value.items.properties) {
              childData = value.items.properties;
              newRequiredFields = (value.items.required) ? value.items.required : newRequiredFields;
            }
            // for items -> oneOf
            if (value.items.oneOf && value.items.oneOf instanceof Array && value.items.oneOf.length < 20) {
              childData = value.items.oneOf
              .map((obj, indx) => {
                return {[`Option ${indx + 1}`]: value.items.oneOf[indx]}
              })
              .reduce((obj, item) => ({...obj, ...item}), {});
            }
          } else if(typeof value.items === 'string') {
            if(value.items === '[Circular]') {
              childData = null;
            }
          }
        } else if(typeof value === 'object' && "properties" in value) {
          childData = value.properties;
          newRequiredFields = (value.required) ? value.required : newRequiredFields;
        } else if (typeof value === 'object' && "additionalProperties" in value) {
          // check if `additionalProperties` is an empty object
          if(Object.keys(value.additionalProperties).length !== 0){
            childData = {"&lt;any-key&gt;": value.additionalProperties};
            newParentKey = "additionalProperties";
          }
        } else if (typeof value === 'object' && "oneOf" in value) {
          // for properties -> oneOf
          if(value.oneOf instanceof Array && value.oneOf.length < 20) {
            childData = value.oneOf
              .map((obj, indx) => {
                return {[`Option ${indx + 1}`]: value.oneOf[indx]}
              })
              .reduce((obj, item) => ({...obj, ...item}), {});
          }
        }
        // for widgets
        /*
        if(key === "definition" && value.discriminator) {
          childData = Object.keys(value.discriminator.mapping)
            .map((mapkey, indx) => { return {[mapkey]: value.oneOf[indx]} })
            .reduce((obj, item) => ({...obj, ...item}), {});
        }
        */
        // console.log(childData);
        // if(childData && "definition" in childData) {
        //   console.log("YES!!!!")
        //   console.log(childData)
        //   childData = value["oneOf"];
        // }

        const isReadOnly = isReadOnlyRow(value);

        // build up row classes
        const outerRowClasses = `${(isNested) ? "isNested d-none" : ""} ${(childData) ? "hasChildData" : ""} ${(isReadOnly) ? "isReadOnly" : ""}`;
        const nestedRowClasses = `first-row ${(childData) ? "js-collapse-trigger collapse-trigger" : ""} ${(isReadOnly) ? "isReadOnly" : ""}`;

        // build markdown
        const toggleArrow = (childData) ? '<span class="toggle-arrow"><svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.7294 4.45711L0.733399 7.82311L1.1294 8.29111L5.6654 4.45711L1.1294 0.641113L0.751398 1.12711L4.7294 4.45711Z" fill="black"/></svg></span> ' : "" ;
        const required = requiredFields.includes(key) ? '&nbsp;[<em>required</em>]' : "";
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
            ${(childData) ? rowRecursive(tableType, childData, true, (newRequiredFields || []), (level + 1), newParentKey) : ''}
          </div>
        </div>
        `.trim();
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
const schemaTable = (tableType, data) => {
  let extraClasses = '';
  let initialData;
  if(data.type === 'array') {
    if(data.items.type === 'array') {
      initialData = data.items.items.properties;
    } else if(data.items.properties) {
      initialData = data.items.properties;
    } else {
      initialData = data.items;
      extraClasses = 'hide-table';
    }
  } else if(data.additionalProperties) {
    initialData = {"&lt;any-key&gt;": data.additionalProperties};
  } else if(data.oneOf && data.oneOf.length > 0) {
    initialData = data.oneOf[0].properties;
  } else {
    initialData = data.properties;
  }
  extraClasses = (initialData) ? extraClasses : 'hide-table';
  const emptyRow = `
    <div class="row">
      <div class="col-12 first-column">
        <div class="row first-row">
          <div class="col-12 column"><p>No ${tableType} body</p></div>
        </div>
      </div>
    </div>`.trim();
  return `<div class="${extraClasses}">${(initialData) ? rowRecursive(tableType, initialData, false, data.required || []) : emptyRow}</div>`;
};

/**
 * Create translation strings files
 */
const createTranslations = (apiYaml, deref, apiVersion) => {
  const tags = apiYaml.tags.map((tag) => {
    const name = getTagSlug(tag.name);
    return {[name]: {"name": tag.name, "description": tag.description}};
  }).reduce((obj, item) => ({...obj, ...item}) ,{});

  const tagsFilePath = `./data/api/${apiVersion}/translate_tags.json`;
  fs.writeFileSync(tagsFilePath, safeJsonStringify(tags, null, 2), 'utf8');

  const actions = {};
  Object.keys(deref.paths)
    .forEach((path) => {
      Object.entries(deref.paths[path]).forEach(([actionKey, action]) => {
        const item = {
          description: action.description,
          summary: action.summary,
          // responses: {}
        }
        if (action.requestBody) {
          item['request_description'] = action.requestBody.description || '';
          if (action.requestBody.content && action.requestBody.content["application/json"]) {
            item['request_schema_description'] = action.requestBody.content["application/json"].schema.description || '';
          }
        }
        /*
        if (action.responses) {
          Object.entries(action.responses).forEach(([responseKey, resp]) => {
            const respObj = {
              description: resp.description
            }
            if (resp.content && resp.content["application/json"] && resp.content["application/json"].schema && resp.content["application/json"].schema.description) {
              respObj["schema_description"] = resp.content["application/json"].schema.description;
            }
            item['responses'][responseKey] = respObj;
          });
        } */
        actions[action.operationId] = item;
      });
    });
  const actionsFilePath = `./data/api/${apiVersion}/translate_actions.json`;
  fs.writeFileSync(actionsFilePath, safeJsonStringify(actions, null, 2), 'utf8');
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
          const jsonString = safeJsonStringify(deref, null, 2);
          const pathToJson = `./data/api/${version}/full_spec_deref.json`;
          fs.writeFileSync(pathToJson, jsonString, 'utf8');

          // create translation ready datafiles
          createTranslations(fileData, deref, version);

          // make a copy in static for postman
          // the postman copy needs to not include the empty "tags" that we
          // included to ensure redirection in the docs page from v2 <-> v1
          const derefStripEmptyTags = lodash.cloneDeep(deref);
          derefStripEmptyTags.tags = derefStripEmptyTags.tags.filter((tag) => !tag.description.toLowerCase().includes("see api version"));
          const jsonStringStripEmptyTags = safeJsonStringify(derefStripEmptyTags, null, 2);
          fs.writeFileSync(`./static/resources/json/full_spec_${version}.json`, jsonStringStripEmptyTags, 'utf8');

          //updateMenu(fileData, version, supportedLangs);
          createPages(fileData, deref, version);
          createResources(fileData, JSON.parse(jsonString), version);

          // for now lets just put the widgets in a file
          if(deref.components.schemas && deref.components.schemas.WidgetDefinition && deref.components.schemas.WidgetDefinition.oneOf) {
            const jsonData = {};
            const pageDir = `./content/en/api/${version}/dashboards/`;
            deref.components.schemas.WidgetDefinition.oneOf.forEach((widget) => {
              const requestJson = filterExampleJson("request", widget);
              const requestCurlJson = filterExampleJson("curl", widget);
              const html = schemaTable("request", widget);
              jsonData[widget.properties.type.default] = {"json_curl": requestCurlJson, "json": requestJson, "html": html};
            });
            fs.writeFileSync(`${pageDir}widgets.json`, safeJsonStringify(jsonData, null, 2), 'utf-8');
          }

        }).catch((e) => {
          console.log(e);
          process.exitCode = 1;
        })
    });

  // update menu with all specs
  const specData = specs.map((spec) => yaml.safeLoad(fs.readFileSync(spec, 'utf8')));
  updateMenu(specData, specs, supportedLangs);
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
  rowRecursive,
  filterExampleJson,
  getSchema,
  getTagSlug,
  outputExample,
  getJsonWrapChars
};
