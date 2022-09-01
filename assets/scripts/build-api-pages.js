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

      const tagSlug = getTagSlug(tag.name);
      const existingMenuItemIndex = newMenuArray.findIndex((i) => i.identifier === tagSlug);
      if(existingMenuItemIndex > -1) {
        // already exists
        // newMenuArray[existingMenuItemIndex].params["versions"].push()
      } else {
        // doesn't exist lets add it
        newMenuArray.push({
          name: tag.name,
          url: (language === 'en' ? `/api/latest/${tagSlug}/` : `/${language}/api/latest/${tagSlug}/` ),
          identifier: tagSlug,
          generated: true
        });
      }

      // just get this sections data
      Object.keys(apiYaml.paths)
        .filter((path) => isTagMatch(apiYaml.paths[path], tag.name))
        .map((path) => Object.values(apiYaml.paths[path]))
        .reduce((obj, item) => ([...obj, ...item]), [])
        .forEach((action) => {

          const actionSlug = getTagSlug(action.summary);
          const itemIdentifier = `${tagSlug}-${actionSlug}`;
          const existingSubMenuItemIndex = newMenuArray.findIndex((i) => i.identifier === itemIdentifier);
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
            const indx = newMenuArray.findIndex((i) => i.identifier === tagSlug);
            const item = {
              name: action.summary,
              url: `#` + actionSlug,
              identifier: itemIdentifier,
              parent: tagSlug,
              generated: true,
              params: {
                "versions": [apiVersion],
                "operationids": [`${action.operationId}`],
                "unstable": action.hasOwnProperty("x-unstable") ? [apiVersion] : [],
                "order": (action.hasOwnProperty("x-menu-order")) ? parseInt(action["x-menu-order"]) : 0
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
    if(key.startsWith("application/json") || key.startsWith("text/json")) {
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
            if (value.type === 'array' || value.example instanceof Array) {
              prefixType = '[';
              suffixType = ']';
            }
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

        if (childData) {
          const [jstring, childRequiredKeyMatches] = filterJson(actionType, childData, value.example, childRequiredKeys, (level + 1));
          iterationHasRequiredKeyMatches = iterationHasRequiredKeyMatches || childRequiredKeyMatches;
          if (actionType === "curl" && !iterationHasRequiredKeyMatches) {
            // skip output
          } else {
            jsondata += `"${key}": ${prefixType}${jstring}${suffixType},`;
          }
        } else {
          // choose the example to use
          // parent -> current level -> one deep
          let ex = '';
          if (typeof value.example !== 'undefined') {
            if (value.example instanceof Array) {
              ex = outputExample(value.example, key);
            } else {
              ex = safeJsonStringify(value.example, null, 2);
            }
          } else if (value.items && typeof value.items.example !== 'undefined' && Object.keys(value.items.example).length !== 0) {
            ex = outputExample(value.items.example, key);
            prefixType = '[';
            suffixType = ']';
          } else {
            ex = outputExample(parentExample, key);
          }
          // bool causes us to not go in here so check for it
          if (actionType === 'curl') {
            ex = ex || null;
          } else {
            ex = ex || outputValueType(value.type, value.format);
          }
          if (actionType === "curl" && !iterationHasRequiredKeyMatches) {

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
          if (inputkey && item !== null && inputkey in item) {
            if (item[inputkey] instanceof Array) {
              ex = `[${outputExample(item[inputkey])}]`;
            } else {
              ex = `${outputExample(item[inputkey])}`;
            }
          }
        } else {
          ex += outputValue(item, !Object.is(arr.length - 1, key));
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
      } else if (Object.keys(chosenExample).length !== 0 && !inputkey) {
          ex = safeJsonStringify(chosenExample, null, 2);
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
              newRequiredFields = (value.items.required) ? value.items.required : [];
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
          newRequiredFields = (value.required) ? value.required : [];
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
          } else if(action.requestBody.content && action.requestBody.content["text/json"]) {
            item['request_schema_description'] = action.requestBody.content["text/json"].schema.description || '';
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
  //const specs = ['./data/api/v1/full_spec.yaml', './data/api/v2/full_spec.yaml'];
  //processSpecs(specs);
  const fileData1 = {
            "type": "object",
            "properties": {
              "items": {
                "type": "array",
                "items": {
                  "$ref": "#/$defs/CloudFront.DistributionSummary"
                }
              },
              "quantity": {
                "type": "number"
              },
              "isTruncated": {
                "type": "boolean"
              }
            },
            "required": ["items"],
            "additionalProperties": false
          };
  const xData = {
	"$schema": "../../../apps/manifest_generator/manifest.schema.json",
	"types": {
		"$schema": "http://json-schema.org/draft-07/schema#",
		"$defs": {
			"ListDistributionsOutputs": {
				"type": "object",
				"properties": {
					"items": {
						"type": "array",
						"items": {
							"$ref": "#/$defs/CloudFront.DistributionSummary"
						}
					},
					"quantity": {
						"type": "number"
					},
					"isTruncated": {
						"type": "boolean"
					}
				},
				"required": ["items"],
				"additionalProperties": false
			},
			"CloudFront.DistributionSummary": {
				"type": "object",
				"properties": {
					"Id": {
						"type": "string",
						"description": "The identifier for the distribution. For example: EDFDVBD632BHDS5."
					},
					"ARN": {
						"type": "string",
						"description": "The ARN (Amazon Resource Name) for the distribution. For example: arn:aws:cloudfront::123456789012:distribution/EDFDVBD632BHDS5, where 123456789012 is your Amazon Web Services account ID."
					},
					"Status": {
						"type": "string",
						"description": "The current status of the distribution. When the status is Deployed, the distribution's information is propagated to all CloudFront edge locations."
					},
					"LastModifiedTime": {
						"$ref": "#/$defs/CloudFront.timestamp",
						"description": "The date and time the distribution was last modified."
					},
					"DomainName": {
						"type": "string",
						"description": "The domain name that corresponds to the distribution, for example, d111111abcdef8.cloudfront.net."
					},
					"Aliases": {
						"$ref": "#/$defs/CloudFront.Aliases",
						"description": "A complex type that contains information about CNAMEs (alternate domain names), if any, for this distribution."
					},
					"Origins": {
						"$ref": "#/$defs/CloudFront.Origins",
						"description": "A complex type that contains information about origins for this distribution."
					},
					"OriginGroups": {
						"$ref": "#/$defs/CloudFront.OriginGroups",
						"description": "A complex type that contains information about origin groups for this distribution."
					},
					"DefaultCacheBehavior": {
						"$ref": "#/$defs/CloudFront.DefaultCacheBehavior",
						"description": "A complex type that describes the default cache behavior if you don't specify a CacheBehavior element or if files don't match any of the values of PathPattern in CacheBehavior elements. You must create exactly one default cache behavior."
					},
					"CacheBehaviors": {
						"$ref": "#/$defs/CloudFront.CacheBehaviors",
						"description": "A complex type that contains zero or more CacheBehavior elements."
					},
					"CustomErrorResponses": {
						"$ref": "#/$defs/CloudFront.CustomErrorResponses",
						"description": "A complex type that contains zero or more CustomErrorResponses elements."
					},
					"Comment": {
						"type": "string",
						"description": "The comment originally specified when this distribution was created."
					},
					"PriceClass": {
						"$ref": "#/$defs/CloudFront.PriceClass",
						"description": "A complex type that contains information about price class for this streaming distribution."
					},
					"Enabled": {
						"type": "boolean",
						"description": "Whether the distribution is enabled to accept user requests for content."
					},
					"ViewerCertificate": {
						"$ref": "#/$defs/CloudFront.ViewerCertificate",
						"description": "A complex type that determines the distribution’s SSL/TLS configuration for communicating with viewers."
					},
					"Restrictions": {
						"$ref": "#/$defs/CloudFront.Restrictions",
						"description": "A complex type that identifies ways in which you want to restrict distribution of your content."
					},
					"WebACLId": {
						"type": "string",
						"description": "The Web ACL Id (if any) associated with the distribution."
					},
					"HttpVersion": {
						"$ref": "#/$defs/CloudFront.HttpVersion",
						"description": "Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. The default value for new web distributions is http2. Viewers that don't support HTTP/2 will automatically use an earlier version."
					},
					"IsIPV6Enabled": {
						"type": "boolean",
						"description": "Whether CloudFront responds to IPv6 DNS requests with an IPv6 address for your distribution."
					},
					"AliasICPRecordals": {
						"$ref": "#/$defs/CloudFront.AliasICPRecordals",
						"description": "Amazon Web Services services in China customers must file for an Internet Content Provider (ICP) recordal if they want to serve content publicly on an alternate domain name, also known as a CNAME, that they've added to CloudFront. AliasICPRecordal provides the ICP recordal status for CNAMEs associated with distributions. For more information about ICP recordals, see  Signup, Accounts, and Credentials in Getting Started with Amazon Web Services services in China."
					}
				},
				"required": [
					"Id",
					"ARN",
					"Status",
					"LastModifiedTime",
					"DomainName",
					"Aliases",
					"Origins",
					"DefaultCacheBehavior",
					"CacheBehaviors",
					"CustomErrorResponses",
					"Comment",
					"PriceClass",
					"Enabled",
					"ViewerCertificate",
					"Restrictions",
					"WebACLId",
					"HttpVersion",
					"IsIPV6Enabled"
				],
				"additionalProperties": false
			},
			"CloudFront.timestamp": {
				"type": "string",
				"format": "date-time"
			},
			"CloudFront.Aliases": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of CNAME aliases, if any, that you want to associate with this distribution."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.AliasList",
						"description": "A complex type that contains the CNAME aliases, if any, that you want to associate with this distribution."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.integer": {
				"type": "number"
			},
			"CloudFront.AliasList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.Origins": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of origins for this distribution."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.OriginList",
						"description": "A list of origins."
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.OriginList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.Origin"
				}
			},
			"CloudFront.Origin": {
				"type": "object",
				"properties": {
					"Id": {
						"type": "string",
						"description": "A unique identifier for the origin. This value must be unique within the distribution. Use this value to specify the TargetOriginId in a CacheBehavior or DefaultCacheBehavior."
					},
					"DomainName": {
						"type": "string",
						"description": "The domain name for the origin. For more information, see Origin Domain Name in the Amazon CloudFront Developer Guide."
					},
					"OriginPath": {
						"type": "string",
						"description": "An optional path that CloudFront appends to the origin domain name when CloudFront requests content from the origin. For more information, see Origin Path in the Amazon CloudFront Developer Guide."
					},
					"CustomHeaders": {
						"$ref": "#/$defs/CloudFront.CustomHeaders",
						"description": "A list of HTTP header names and values that CloudFront adds to the requests that it sends to the origin. For more information, see Adding Custom Headers to Origin Requests in the Amazon CloudFront Developer Guide."
					},
					"S3OriginConfig": {
						"$ref": "#/$defs/CloudFront.S3OriginConfig",
						"description": "Use this type to specify an origin that is an Amazon S3 bucket that is not configured with static website hosting. To specify any other type of origin, including an Amazon S3 bucket that is configured with static website hosting, use the CustomOriginConfig type instead."
					},
					"CustomOriginConfig": {
						"$ref": "#/$defs/CloudFront.CustomOriginConfig",
						"description": "Use this type to specify an origin that is not an Amazon S3 bucket, with one exception. If the Amazon S3 bucket is configured with static website hosting, use this type. If the Amazon S3 bucket is not configured with static website hosting, use the S3OriginConfig type instead."
					},
					"ConnectionAttempts": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of times that CloudFront attempts to connect to the origin. The minimum number is 1, the maximum is 3, and the default (if you don’t specify otherwise) is 3. For a custom origin (including an Amazon S3 bucket that’s configured with static website hosting), this value also specifies the number of times that CloudFront attempts to get a response from the origin, in the case of an Origin Response Timeout. For more information, see Origin Connection Attempts in the Amazon CloudFront Developer Guide."
					},
					"ConnectionTimeout": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of seconds that CloudFront waits when trying to establish a connection to the origin. The minimum timeout is 1 second, the maximum is 10 seconds, and the default (if you don’t specify otherwise) is 10 seconds. For more information, see Origin Connection Timeout in the Amazon CloudFront Developer Guide."
					},
					"OriginShield": {
						"$ref": "#/$defs/CloudFront.OriginShield",
						"description": "CloudFront Origin Shield. Using Origin Shield can help reduce the load on your origin. For more information, see Using Origin Shield in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["Id", "DomainName"],
				"additionalProperties": false
			},
			"CloudFront.CustomHeaders": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of custom headers, if any, for this distribution."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.OriginCustomHeadersList",
						"description": "Optional: A list that contains one OriginCustomHeader element for each custom header that you want CloudFront to forward to the origin. If Quantity is 0, omit Items."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.OriginCustomHeadersList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.OriginCustomHeader"
				}
			},
			"CloudFront.OriginCustomHeader": {
				"type": "object",
				"properties": {
					"HeaderName": {
						"type": "string",
						"description": "The name of a header that you want CloudFront to send to your origin. For more information, see Adding Custom Headers to Origin Requests in the  Amazon CloudFront Developer Guide."
					},
					"HeaderValue": {
						"$ref": "#/$defs/CloudFront.sensitiveStringType",
						"description": "The value for the header that you specified in the HeaderName field."
					}
				},
				"required": ["HeaderName", "HeaderValue"],
				"additionalProperties": false
			},
			"CloudFront.sensitiveStringType": {
				"type": "string"
			},
			"CloudFront.S3OriginConfig": {
				"type": "object",
				"properties": {
					"OriginAccessIdentity": {
						"type": "string",
						"description": "The CloudFront origin access identity to associate with the origin. Use an origin access identity to configure the origin so that viewers can only access objects in an Amazon S3 bucket through CloudFront. The format of the value is: origin-access-identity/cloudfront/ID-of-origin-access-identity  where  ID-of-origin-access-identity  is the value that CloudFront returned in the ID element when you created the origin access identity. If you want viewers to be able to access objects using either the CloudFront URL or the Amazon S3 URL, specify an empty OriginAccessIdentity element. To delete the origin access identity from an existing distribution, update the distribution configuration and include an empty OriginAccessIdentity element. To replace the origin access identity, update the distribution configuration and specify the new origin access identity. For more information about the origin access identity, see Serving Private Content through CloudFront in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["OriginAccessIdentity"],
				"additionalProperties": false
			},
			"CloudFront.CustomOriginConfig": {
				"type": "object",
				"properties": {
					"HTTPPort": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The HTTP port that CloudFront uses to connect to the origin. Specify the HTTP port that the origin listens on."
					},
					"HTTPSPort": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The HTTPS port that CloudFront uses to connect to the origin. Specify the HTTPS port that the origin listens on."
					},
					"OriginProtocolPolicy": {
						"$ref": "#/$defs/CloudFront.OriginProtocolPolicy",
						"description": "Specifies the protocol (HTTP or HTTPS) that CloudFront uses to connect to the origin. Valid values are:    http-only – CloudFront always uses HTTP to connect to the origin.    match-viewer – CloudFront connects to the origin using the same protocol that the viewer used to connect to CloudFront.    https-only – CloudFront always uses HTTPS to connect to the origin."
					},
					"OriginSslProtocols": {
						"$ref": "#/$defs/CloudFront.OriginSslProtocols",
						"description": "Specifies the minimum SSL/TLS protocol that CloudFront uses when connecting to your origin over HTTPS. Valid values include SSLv3, TLSv1, TLSv1.1, and TLSv1.2. For more information, see Minimum Origin SSL Protocol in the Amazon CloudFront Developer Guide."
					},
					"OriginReadTimeout": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "Specifies how long, in seconds, CloudFront waits for a response from the origin. This is also known as the origin response timeout. The minimum timeout is 1 second, the maximum is 60 seconds, and the default (if you don’t specify otherwise) is 30 seconds. For more information, see Origin Response Timeout in the Amazon CloudFront Developer Guide."
					},
					"OriginKeepaliveTimeout": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "Specifies how long, in seconds, CloudFront persists its connection to the origin. The minimum timeout is 1 second, the maximum is 60 seconds, and the default (if you don’t specify otherwise) is 5 seconds. For more information, see Origin Keep-alive Timeout in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["HTTPPort", "HTTPSPort", "OriginProtocolPolicy"],
				"additionalProperties": false
			},
			"CloudFront.OriginProtocolPolicy": {
				"type": "string"
			},
			"CloudFront.OriginSslProtocols": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of SSL/TLS protocols that you want to allow CloudFront to use when establishing an HTTPS connection with this origin."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.SslProtocolsList",
						"description": "A list that contains allowed SSL/TLS protocols for this distribution."
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.SslProtocolsList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.SslProtocol"
				}
			},
			"CloudFront.SslProtocol": {
				"type": "string"
			},
			"CloudFront.OriginShield": {
				"type": "object",
				"properties": {
					"Enabled": {
						"type": "boolean",
						"description": "A flag that specifies whether Origin Shield is enabled. When it’s enabled, CloudFront routes all requests through Origin Shield, which can help protect your origin. When it’s disabled, CloudFront might send requests directly to your origin from multiple edge locations or regional edge caches."
					},
					"OriginShieldRegion": {
						"$ref": "#/$defs/CloudFront.OriginShieldRegion",
						"description": "The Amazon Web Services Region for Origin Shield. Specify the Amazon Web Services Region that has the lowest latency to your origin. To specify a region, use the region code, not the region name. For example, specify the US East (Ohio) region as us-east-2. When you enable CloudFront Origin Shield, you must specify the Amazon Web Services Region for Origin Shield. For the list of Amazon Web Services Regions that you can specify, and for help choosing the best Region for your origin, see Choosing the Amazon Web Services Region for Origin Shield in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["Enabled"],
				"additionalProperties": false
			},
			"CloudFront.OriginShieldRegion": {
				"type": "string"
			},
			"CloudFront.OriginGroups": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of origin groups."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.OriginGroupList",
						"description": "The items (origin groups) in a distribution."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.OriginGroupList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.OriginGroup"
				}
			},
			"CloudFront.OriginGroup": {
				"type": "object",
				"properties": {
					"Id": {
						"type": "string",
						"description": "The origin group's ID."
					},
					"FailoverCriteria": {
						"$ref": "#/$defs/CloudFront.OriginGroupFailoverCriteria",
						"description": "A complex type that contains information about the failover criteria for an origin group."
					},
					"Members": {
						"$ref": "#/$defs/CloudFront.OriginGroupMembers",
						"description": "A complex type that contains information about the origins in an origin group."
					}
				},
				"required": ["Id", "FailoverCriteria", "Members"],
				"additionalProperties": false
			},
			"CloudFront.OriginGroupFailoverCriteria": {
				"type": "object",
				"properties": {
					"StatusCodes": {
						"$ref": "#/$defs/CloudFront.StatusCodes",
						"description": "The status codes that, when returned from the primary origin, will trigger CloudFront to failover to the second origin."
					}
				},
				"required": ["StatusCodes"],
				"additionalProperties": false
			},
			"CloudFront.StatusCodes": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of status codes."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.StatusCodeList",
						"description": "The items (status codes) for an origin group."
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.StatusCodeList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.integer"
				}
			},
			"CloudFront.OriginGroupMembers": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of origins in an origin group."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.OriginGroupMemberList",
						"description": "Items (origins) in an origin group."
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.OriginGroupMemberList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.OriginGroupMember"
				}
			},
			"CloudFront.OriginGroupMember": {
				"type": "object",
				"properties": {
					"OriginId": {
						"type": "string",
						"description": "The ID for an origin in an origin group."
					}
				},
				"required": ["OriginId"],
				"additionalProperties": false
			},
			"CloudFront.DefaultCacheBehavior": {
				"type": "object",
				"properties": {
					"TargetOriginId": {
						"type": "string",
						"description": "The value of ID for the origin that you want CloudFront to route requests to when they use the default cache behavior."
					},
					"TrustedSigners": {
						"$ref": "#/$defs/CloudFront.TrustedSigners",
						"description": "We recommend using TrustedKeyGroups instead of TrustedSigners.  A list of Amazon Web Services account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in a trusted signer’s Amazon Web Services account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see Serving private content in the Amazon CloudFront Developer Guide."
					},
					"TrustedKeyGroups": {
						"$ref": "#/$defs/CloudFront.TrustedKeyGroups",
						"description": "A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see Serving private content in the Amazon CloudFront Developer Guide."
					},
					"ViewerProtocolPolicy": {
						"$ref": "#/$defs/CloudFront.ViewerProtocolPolicy",
						"description": "The protocol that viewers can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. You can specify the following options:    allow-all: Viewers can use HTTP or HTTPS.    redirect-to-https: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL.    https-only: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden).   For more information about requiring the HTTPS protocol, see Requiring HTTPS Between Viewers and CloudFront in the Amazon CloudFront Developer Guide.  The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects’ cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see Managing Cache Expiration in the Amazon CloudFront Developer Guide."
					},
					"AllowedMethods": {
						"$ref": "#/$defs/CloudFront.AllowedMethods"
					},
					"SmoothStreaming": {
						"type": "boolean",
						"description": "Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify true; if not, specify false. If you specify true for SmoothStreaming, you can still distribute other content using this cache behavior if the content matches the value of PathPattern."
					},
					"Compress": {
						"type": "boolean",
						"description": "Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify true; if not, specify false. For more information, see Serving Compressed Files in the Amazon CloudFront Developer Guide."
					},
					"LambdaFunctionAssociations": {
						"$ref": "#/$defs/CloudFront.LambdaFunctionAssociations",
						"description": "A complex type that contains zero or more Lambda@Edge function associations for a cache behavior."
					},
					"FunctionAssociations": {
						"$ref": "#/$defs/CloudFront.FunctionAssociations",
						"description": "A list of CloudFront functions that are associated with this cache behavior. CloudFront functions must be published to the LIVE stage to associate them with a cache behavior."
					},
					"FieldLevelEncryptionId": {
						"type": "string",
						"description": "The value of ID for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for the default cache behavior."
					},
					"RealtimeLogConfigArn": {
						"type": "string",
						"description": "The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see Real-time logs in the Amazon CloudFront Developer Guide."
					},
					"CachePolicyId": {
						"type": "string",
						"description": "The unique identifier of the cache policy that is attached to the default cache behavior. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. A DefaultCacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId."
					},
					"OriginRequestPolicyId": {
						"type": "string",
						"description": "The unique identifier of the origin request policy that is attached to the default cache behavior. For more information, see Creating origin request policies or Using the managed origin request policies in the Amazon CloudFront Developer Guide."
					},
					"ResponseHeadersPolicyId": {
						"type": "string",
						"description": "The identifier for a response headers policy."
					},
					"ForwardedValues": {
						"$ref": "#/$defs/CloudFront.ForwardedValues",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see Working with policies in the Amazon CloudFront Developer Guide. If you want to include values in the cache key, use a cache policy. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies or Using the managed origin request policies in the Amazon CloudFront Developer Guide. A DefaultCacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers."
					},
					"MinTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the MinTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see Managing How Long Content Stays in an Edge Cache (Expiration) in the Amazon CloudFront Developer Guide. You must specify 0 for MinTTL if you configure CloudFront to forward all headers to your origin (under Headers, if you specify 1 for Quantity and * for Name)."
					},
					"DefaultTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the DefaultTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see Managing How Long Content Stays in an Edge Cache (Expiration) in the Amazon CloudFront Developer Guide."
					},
					"MaxTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the MaxTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see Managing How Long Content Stays in an Edge Cache (Expiration) in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["TargetOriginId", "ViewerProtocolPolicy"],
				"additionalProperties": false
			},
			"CloudFront.TrustedSigners": {
				"type": "object",
				"properties": {
					"Enabled": {
						"type": "boolean",
						"description": "This field is true if any of the Amazon Web Services accounts have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is false."
					},
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of Amazon Web Services accounts in the list."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.AwsAccountNumberList",
						"description": "A list of Amazon Web Services account identifiers."
					}
				},
				"required": ["Enabled", "Quantity"],
				"additionalProperties": false
			},
			"CloudFront.AwsAccountNumberList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.TrustedKeyGroups": {
				"type": "object",
				"properties": {
					"Enabled": {
						"type": "boolean",
						"description": "This field is true if any of the key groups in the list have public keys that CloudFront can use to verify the signatures of signed URLs and signed cookies. If not, this field is false."
					},
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of key groups in the list."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.TrustedKeyGroupIdList",
						"description": "A list of key groups identifiers."
					}
				},
				"required": ["Enabled", "Quantity"],
				"additionalProperties": false
			},
			"CloudFront.TrustedKeyGroupIdList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.ViewerProtocolPolicy": {
				"type": "string"
			},
			"CloudFront.AllowedMethods": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of HTTP methods that you want CloudFront to forward to your origin. Valid values are 2 (for GET and HEAD requests), 3 (for GET, HEAD, and OPTIONS requests) and 7 (for GET, HEAD, OPTIONS, PUT, PATCH, POST, and DELETE requests)."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.MethodsList",
						"description": "A complex type that contains the HTTP methods that you want CloudFront to process and forward to your origin."
					},
					"CachedMethods": {
						"$ref": "#/$defs/CloudFront.CachedMethods"
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.MethodsList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.Method"
				}
			},
			"CloudFront.Method": {
				"type": "string"
			},
			"CloudFront.CachedMethods": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of HTTP methods for which you want CloudFront to cache responses. Valid values are 2 (for caching responses to GET and HEAD requests) and 3 (for caching responses to GET, HEAD, and OPTIONS requests)."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.MethodsList",
						"description": "A complex type that contains the HTTP methods that you want CloudFront to cache responses to."
					}
				},
				"required": ["Quantity", "Items"],
				"additionalProperties": false
			},
			"CloudFront.LambdaFunctionAssociations": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of Lambda@Edge function associations for this cache behavior."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.LambdaFunctionAssociationList",
						"description": "Optional: A complex type that contains LambdaFunctionAssociation items for this cache behavior. If Quantity is 0, you can omit Items."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.LambdaFunctionAssociationList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.LambdaFunctionAssociation"
				}
			},
			"CloudFront.LambdaFunctionAssociation": {
				"type": "object",
				"properties": {
					"LambdaFunctionARN": {
						"$ref": "#/$defs/CloudFront.LambdaFunctionARN",
						"description": "The ARN of the Lambda@Edge function. You must specify the ARN of a function version; you can't specify an alias or $LATEST."
					},
					"EventType": {
						"$ref": "#/$defs/CloudFront.EventType",
						"description": "Specifies the event type that triggers a Lambda@Edge function invocation. You can specify the following values:    viewer-request: The function executes when CloudFront receives a request from a viewer and before it checks to see whether the requested object is in the edge cache.     origin-request: The function executes only when CloudFront sends a request to your origin. When the requested object is in the edge cache, the function doesn't execute.    origin-response: The function executes after CloudFront receives a response from the origin and before it caches the object in the response. When the requested object is in the edge cache, the function doesn't execute.    viewer-response: The function executes before CloudFront returns the requested object to the viewer. The function executes regardless of whether the object was already in the edge cache. If the origin returns an HTTP status code other than HTTP 200 (OK), the function doesn't execute."
					},
					"IncludeBody": {
						"type": "boolean",
						"description": "A flag that allows a Lambda@Edge function to have read access to the body content. For more information, see Accessing the Request Body by Choosing the Include Body Option in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["LambdaFunctionARN", "EventType"],
				"additionalProperties": false
			},
			"CloudFront.LambdaFunctionARN": {
				"type": "string"
			},
			"CloudFront.EventType": {
				"type": "string"
			},
			"CloudFront.FunctionAssociations": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of CloudFront functions in the list."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.FunctionAssociationList",
						"description": "The CloudFront functions that are associated with a cache behavior in a CloudFront distribution. CloudFront functions must be published to the LIVE stage to associate them with a cache behavior."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.FunctionAssociationList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.FunctionAssociation"
				}
			},
			"CloudFront.FunctionAssociation": {
				"type": "object",
				"properties": {
					"FunctionARN": {
						"$ref": "#/$defs/CloudFront.FunctionARN",
						"description": "The Amazon Resource Name (ARN) of the function."
					},
					"EventType": {
						"$ref": "#/$defs/CloudFront.EventType",
						"description": "The event type of the function, either viewer-request or viewer-response. You cannot use origin-facing event types (origin-request and origin-response) with a CloudFront function."
					}
				},
				"required": ["FunctionARN", "EventType"],
				"additionalProperties": false
			},
			"CloudFront.FunctionARN": {
				"type": "string"
			},
			"CloudFront.ForwardedValues": {
				"type": "object",
				"properties": {
					"QueryString": {
						"type": "boolean",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. Indicates whether you want CloudFront to forward query strings to the origin that is associated with this cache behavior and cache based on the query string parameters. CloudFront behavior depends on the value of QueryString and on the values that you specify for QueryStringCacheKeys, if any: If you specify true for QueryString and you don't specify any values for QueryStringCacheKeys, CloudFront forwards all query string parameters to the origin and caches based on all query string parameters. Depending on how many query string parameters and values you have, this can adversely affect performance because CloudFront must forward more requests to the origin. If you specify true for QueryString and you specify one or more values for QueryStringCacheKeys, CloudFront forwards all query string parameters to the origin, but it only caches based on the query string parameters that you specify. If you specify false for QueryString, CloudFront doesn't forward any query string parameters to the origin, and doesn't cache based on query string parameters. For more information, see Configuring CloudFront to Cache Based on Query String Parameters in the Amazon CloudFront Developer Guide."
					},
					"Cookies": {
						"$ref": "#/$defs/CloudFront.CookiePreference",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. A complex type that specifies whether you want CloudFront to forward cookies to the origin and, if so, which ones. For more information about forwarding cookies to the origin, see How CloudFront Forwards, Caches, and Logs Cookies in the Amazon CloudFront Developer Guide."
					},
					"Headers": {
						"$ref": "#/$defs/CloudFront.Headers",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include headers in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send headers to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. A complex type that specifies the Headers, if any, that you want CloudFront to forward to the origin for this cache behavior (whitelisted headers). For the headers that you specify, CloudFront also caches separate versions of a specified object that is based on the header values in viewer requests. For more information, see  Caching Content Based on Request Headers in the Amazon CloudFront Developer Guide."
					},
					"QueryStringCacheKeys": {
						"$ref": "#/$defs/CloudFront.QueryStringCacheKeys",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include query strings in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send query strings to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. A complex type that contains information about the query string parameters that you want CloudFront to use for caching for this cache behavior."
					}
				},
				"required": ["QueryString", "Cookies"],
				"additionalProperties": false
			},
			"CloudFront.CookiePreference": {
				"type": "object",
				"properties": {
					"Forward": {
						"$ref": "#/$defs/CloudFront.ItemSelection",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send cookies to the origin but not include them in the cache key, use origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. Specifies which cookies to forward to the origin for this cache behavior: all, none, or the list of cookies specified in the WhitelistedNames complex type. Amazon S3 doesn't process cookies. When the cache behavior is forwarding requests to an Amazon S3 origin, specify none for the Forward element."
					},
					"WhitelistedNames": {
						"$ref": "#/$defs/CloudFront.CookieNames",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. If you want to include cookies in the cache key, use a cache policy. For more information, see Creating cache policies in the Amazon CloudFront Developer Guide. If you want to send cookies to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies in the Amazon CloudFront Developer Guide. Required if you specify whitelist for the value of Forward. A complex type that specifies how many different cookies you want CloudFront to forward to the origin for this cache behavior and, if you want to forward selected cookies, the names of those cookies. If you specify all or none for the value of Forward, omit WhitelistedNames. If you change the value of Forward from whitelist to all or none and you don't delete the WhitelistedNames element and its child elements, CloudFront deletes them automatically. For the current limit on the number of cookie names that you can whitelist for each cache behavior, see  CloudFront Limits in the Amazon Web Services General Reference."
					}
				},
				"required": ["Forward"],
				"additionalProperties": false
			},
			"CloudFront.ItemSelection": {
				"type": "string"
			},
			"CloudFront.CookieNames": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of cookie names in the Items list."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.CookieNameList",
						"description": "A list of cookie names."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.CookieNameList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.Headers": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of header names in the Items list."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.HeaderList",
						"description": "A list of HTTP header names."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.HeaderList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.QueryStringCacheKeys": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of whitelisted query string parameters for a cache behavior."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.QueryStringCacheKeysList",
						"description": "A list that contains the query string parameters that you want CloudFront to use as a basis for caching for a cache behavior. If Quantity is 0, you can omit Items."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.QueryStringCacheKeysList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.long": {
				"type": "number"
			},
			"CloudFront.CacheBehaviors": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of cache behaviors for this distribution."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.CacheBehaviorList",
						"description": "Optional: A complex type that contains cache behaviors for this distribution. If Quantity is 0, you can omit Items."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.CacheBehaviorList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.CacheBehavior"
				}
			},
			"CloudFront.CacheBehavior": {
				"type": "object",
				"properties": {
					"PathPattern": {
						"type": "string",
						"description": "The pattern (for example, images/*.jpg) that specifies which requests to apply the behavior to. When CloudFront receives a viewer request, the requested path is compared with path patterns in the order in which cache behaviors are listed in the distribution.  You can optionally include a slash (/) at the beginning of the path pattern. For example, /images/*.jpg. CloudFront behavior is the same with or without the leading /.  The path pattern for the default cache behavior is * and cannot be changed. If the request for an object does not match the path pattern for any cache behaviors, CloudFront applies the behavior in the default cache behavior. For more information, see Path Pattern in the  Amazon CloudFront Developer Guide."
					},
					"TargetOriginId": {
						"type": "string",
						"description": "The value of ID for the origin that you want CloudFront to route requests to when they match this cache behavior."
					},
					"TrustedSigners": {
						"$ref": "#/$defs/CloudFront.TrustedSigners",
						"description": "We recommend using TrustedKeyGroups instead of TrustedSigners.  A list of Amazon Web Services account IDs whose public keys CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted signers, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with the private key of a CloudFront key pair in the trusted signer’s Amazon Web Services account. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see Serving private content in the Amazon CloudFront Developer Guide."
					},
					"TrustedKeyGroups": {
						"$ref": "#/$defs/CloudFront.TrustedKeyGroups",
						"description": "A list of key groups that CloudFront can use to validate signed URLs or signed cookies. When a cache behavior contains trusted key groups, CloudFront requires signed URLs or signed cookies for all requests that match the cache behavior. The URLs or cookies must be signed with a private key whose corresponding public key is in the key group. The signed URL or cookie contains information about which public key CloudFront should use to verify the signature. For more information, see Serving private content in the Amazon CloudFront Developer Guide."
					},
					"ViewerProtocolPolicy": {
						"$ref": "#/$defs/CloudFront.ViewerProtocolPolicy",
						"description": "The protocol that viewers can use to access the files in the origin specified by TargetOriginId when a request matches the path pattern in PathPattern. You can specify the following options:    allow-all: Viewers can use HTTP or HTTPS.    redirect-to-https: If a viewer submits an HTTP request, CloudFront returns an HTTP status code of 301 (Moved Permanently) to the viewer along with the HTTPS URL. The viewer then resubmits the request using the new URL.     https-only: If a viewer sends an HTTP request, CloudFront returns an HTTP status code of 403 (Forbidden).    For more information about requiring the HTTPS protocol, see Requiring HTTPS Between Viewers and CloudFront in the Amazon CloudFront Developer Guide.  The only way to guarantee that viewers retrieve an object that was fetched from the origin using HTTPS is never to use any other protocol to fetch the object. If you have recently changed from HTTP to HTTPS, we recommend that you clear your objects’ cache because cached objects are protocol agnostic. That means that an edge location will return an object from the cache regardless of whether the current request protocol matches the protocol used previously. For more information, see Managing Cache Expiration in the Amazon CloudFront Developer Guide."
					},
					"AllowedMethods": {
						"$ref": "#/$defs/CloudFront.AllowedMethods"
					},
					"SmoothStreaming": {
						"type": "boolean",
						"description": "Indicates whether you want to distribute media files in the Microsoft Smooth Streaming format using the origin that is associated with this cache behavior. If so, specify true; if not, specify false. If you specify true for SmoothStreaming, you can still distribute other content using this cache behavior if the content matches the value of PathPattern."
					},
					"Compress": {
						"type": "boolean",
						"description": "Whether you want CloudFront to automatically compress certain files for this cache behavior. If so, specify true; if not, specify false. For more information, see Serving Compressed Files in the Amazon CloudFront Developer Guide."
					},
					"LambdaFunctionAssociations": {
						"$ref": "#/$defs/CloudFront.LambdaFunctionAssociations",
						"description": "A complex type that contains zero or more Lambda@Edge function associations for a cache behavior."
					},
					"FunctionAssociations": {
						"$ref": "#/$defs/CloudFront.FunctionAssociations",
						"description": "A list of CloudFront functions that are associated with this cache behavior. CloudFront functions must be published to the LIVE stage to associate them with a cache behavior."
					},
					"FieldLevelEncryptionId": {
						"type": "string",
						"description": "The value of ID for the field-level encryption configuration that you want CloudFront to use for encrypting specific fields of data for this cache behavior."
					},
					"RealtimeLogConfigArn": {
						"type": "string",
						"description": "The Amazon Resource Name (ARN) of the real-time log configuration that is attached to this cache behavior. For more information, see Real-time logs in the Amazon CloudFront Developer Guide."
					},
					"CachePolicyId": {
						"type": "string",
						"description": "The unique identifier of the cache policy that is attached to this cache behavior. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. A CacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId."
					},
					"OriginRequestPolicyId": {
						"type": "string",
						"description": "The unique identifier of the origin request policy that is attached to this cache behavior. For more information, see Creating origin request policies or Using the managed origin request policies in the Amazon CloudFront Developer Guide."
					},
					"ResponseHeadersPolicyId": {
						"type": "string",
						"description": "The identifier for a response headers policy."
					},
					"ForwardedValues": {
						"$ref": "#/$defs/CloudFront.ForwardedValues",
						"description": "This field is deprecated. We recommend that you use a cache policy or an origin request policy instead of this field. For more information, see Working with policies in the Amazon CloudFront Developer Guide. If you want to include values in the cache key, use a cache policy. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. If you want to send values to the origin but not include them in the cache key, use an origin request policy. For more information, see Creating origin request policies or Using the managed origin request policies in the Amazon CloudFront Developer Guide. A CacheBehavior must include either a CachePolicyId or ForwardedValues. We recommend that you use a CachePolicyId. A complex type that specifies how CloudFront handles query strings, cookies, and HTTP headers."
					},
					"MinTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the MinTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The minimum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. For more information, see  Managing How Long Content Stays in an Edge Cache (Expiration) in the  Amazon CloudFront Developer Guide. You must specify 0 for MinTTL if you configure CloudFront to forward all headers to your origin (under Headers, if you specify 1 for Quantity and * for Name)."
					},
					"DefaultTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the DefaultTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The default amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin does not add HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see Managing How Long Content Stays in an Edge Cache (Expiration) in the Amazon CloudFront Developer Guide."
					},
					"MaxTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "This field is deprecated. We recommend that you use the MaxTTL field in a cache policy instead of this field. For more information, see Creating cache policies or Using the managed cache policies in the Amazon CloudFront Developer Guide. The maximum amount of time that you want objects to stay in CloudFront caches before CloudFront forwards another request to your origin to determine whether the object has been updated. The value that you specify applies only when your origin adds HTTP headers such as Cache-Control max-age, Cache-Control s-maxage, and Expires to objects. For more information, see Managing How Long Content Stays in an Edge Cache (Expiration) in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["PathPattern", "TargetOriginId", "ViewerProtocolPolicy"],
				"additionalProperties": false
			},
			"CloudFront.CustomErrorResponses": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of HTTP status codes for which you want to specify a custom error page and/or a caching duration. If Quantity is 0, you can omit Items."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.CustomErrorResponseList",
						"description": "A complex type that contains a CustomErrorResponse element for each HTTP status code for which you want to specify a custom error page and/or a caching duration."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.CustomErrorResponseList": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.CustomErrorResponse"
				}
			},
			"CloudFront.CustomErrorResponse": {
				"type": "object",
				"properties": {
					"ErrorCode": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The HTTP status code for which you want to specify a custom error page and/or a caching duration."
					},
					"ResponsePagePath": {
						"type": "string",
						"description": "The path to the custom error page that you want CloudFront to return to a viewer when your origin returns the HTTP status code specified by ErrorCode, for example, /4xx-errors/403-forbidden.html. If you want to store your objects and your custom error pages in different locations, your distribution must include a cache behavior for which the following is true:   The value of PathPattern matches the path to your custom error messages. For example, suppose you saved custom error pages for 4xx errors in an Amazon S3 bucket in a directory named /4xx-errors. Your distribution must include a cache behavior for which the path pattern routes requests for your custom error pages to that location, for example, /4xx-errors/*.    The value of TargetOriginId specifies the value of the ID element for the origin that contains your custom error pages.   If you specify a value for ResponsePagePath, you must also specify a value for ResponseCode. We recommend that you store custom error pages in an Amazon S3 bucket. If you store custom error pages on an HTTP server and the server starts to return 5xx errors, CloudFront can't get the files that you want to return to viewers because the origin server is unavailable."
					},
					"ResponseCode": {
						"type": "string",
						"description": "The HTTP status code that you want CloudFront to return to the viewer along with the custom error page. There are a variety of reasons that you might want CloudFront to return a status code different from the status code that your origin returned to CloudFront, for example:   Some Internet devices (some firewalls and corporate proxies, for example) intercept HTTP 4xx and 5xx and prevent the response from being returned to the viewer. If you substitute 200, the response typically won't be intercepted.   If you don't care about distinguishing among different client errors or server errors, you can specify 400 or 500 as the ResponseCode for all 4xx or 5xx errors.   You might want to return a 200 status code (OK) and static website so your customers don't know that your website is down.   If you specify a value for ResponseCode, you must also specify a value for ResponsePagePath."
					},
					"ErrorCachingMinTTL": {
						"$ref": "#/$defs/CloudFront.long",
						"description": "The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in ErrorCode. When this time period has elapsed, CloudFront queries your origin to see whether the problem that caused the error has been resolved and the requested object is now available. For more information, see Customizing Error Responses in the Amazon CloudFront Developer Guide."
					}
				},
				"required": ["ErrorCode"],
				"additionalProperties": false
			},
			"CloudFront.PriceClass": {
				"type": "string"
			},
			"CloudFront.ViewerCertificate": {
				"type": "object",
				"properties": {
					"CloudFrontDefaultCertificate": {
						"type": "boolean",
						"description": "If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net, set this field to true. If the distribution uses Aliases (alternate domain names or CNAMEs), set this field to false and specify values for the following fields:    ACMCertificateArn or IAMCertificateId (specify a value for one, not both)    MinimumProtocolVersion     SSLSupportMethod"
					},
					"IAMCertificateId": {
						"type": "string",
						"description": "If the distribution uses Aliases (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in Identity and Access Management (IAM), provide the ID of the IAM certificate. If you specify an IAM certificate ID, you must also specify values for MinimumProtocolVersion and SSLSupportMethod."
					},
					"ACMCertificateArn": {
						"type": "string",
						"description": "If the distribution uses Aliases (alternate domain names or CNAMEs) and the SSL/TLS certificate is stored in Certificate Manager (ACM), provide the Amazon Resource Name (ARN) of the ACM certificate. CloudFront only supports ACM certificates in the US East (N. Virginia) Region (us-east-1). If you specify an ACM certificate ARN, you must also specify values for MinimumProtocolVersion and SSLSupportMethod."
					},
					"SSLSupportMethod": {
						"$ref": "#/$defs/CloudFront.SSLSupportMethod",
						"description": "If the distribution uses Aliases (alternate domain names or CNAMEs), specify which viewers the distribution accepts HTTPS connections from.    sni-only – The distribution accepts HTTPS connections from only viewers that support server name indication (SNI). This is recommended. Most browsers and clients support SNI.    vip – The distribution accepts HTTPS connections from all viewers including those that don’t support SNI. This is not recommended, and results in additional monthly charges from CloudFront.    static-ip - Do not specify this value unless your distribution has been enabled for this feature by the CloudFront team. If you have a use case that requires static IP addresses for a distribution, contact CloudFront through the Amazon Web Services Support Center.   If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net, don’t set a value for this field."
					},
					"MinimumProtocolVersion": {
						"$ref": "#/$defs/CloudFront.MinimumProtocolVersion",
						"description": "If the distribution uses Aliases (alternate domain names or CNAMEs), specify the security policy that you want CloudFront to use for HTTPS connections with viewers. The security policy determines two settings:   The minimum SSL/TLS protocol that CloudFront can use to communicate with viewers.   The ciphers that CloudFront can use to encrypt the content that it returns to viewers.   For more information, see Security Policy and Supported Protocols and Ciphers Between Viewers and CloudFront in the Amazon CloudFront Developer Guide.  On the CloudFront console, this setting is called Security Policy.  When you’re using SNI only (you set SSLSupportMethod to sni-only), you must specify TLSv1 or higher. If the distribution uses the CloudFront domain name such as d111111abcdef8.cloudfront.net (you set CloudFrontDefaultCertificate to true), CloudFront automatically sets the security policy to TLSv1 regardless of the value that you set here."
					},
					"Certificate": {
						"type": "string",
						"description": "This field is deprecated. Use one of the following fields instead:    ACMCertificateArn     IAMCertificateId     CloudFrontDefaultCertificate"
					},
					"CertificateSource": {
						"$ref": "#/$defs/CloudFront.CertificateSource",
						"description": "This field is deprecated. Use one of the following fields instead:    ACMCertificateArn     IAMCertificateId     CloudFrontDefaultCertificate"
					}
				},
				"additionalProperties": false
			},
			"CloudFront.SSLSupportMethod": {
				"type": "string"
			},
			"CloudFront.MinimumProtocolVersion": {
				"type": "string"
			},
			"CloudFront.CertificateSource": {
				"type": "string"
			},
			"CloudFront.Restrictions": {
				"type": "object",
				"properties": {
					"GeoRestriction": {
						"$ref": "#/$defs/CloudFront.GeoRestriction",
						"description": "A complex type that controls the countries in which your content is distributed. CloudFront determines the location of your users using MaxMind GeoIP databases."
					}
				},
				"required": ["GeoRestriction"],
				"additionalProperties": false
			},
			"CloudFront.GeoRestriction": {
				"type": "object",
				"properties": {
					"RestrictionType": {
						"$ref": "#/$defs/CloudFront.GeoRestrictionType",
						"description": "The method that you want to use to restrict distribution of your content by country:    none: No geo restriction is enabled, meaning access to content is not restricted by client geo location.    blacklist: The Location elements specify the countries in which you don't want CloudFront to distribute your content.    whitelist: The Location elements specify the countries in which you want CloudFront to distribute your content."
					},
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "When geo restriction is enabled, this is the number of countries in your whitelist or blacklist. Otherwise, when it is not enabled, Quantity is 0, and you can omit Items."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.LocationList",
						"description": "A complex type that contains a Location element for each country in which you want CloudFront either to distribute your content (whitelist) or not distribute your content (blacklist). The Location element is a two-letter, uppercase country code for a country that you want to include in your blacklist or whitelist. Include one Location element for each country. CloudFront and MaxMind both use ISO 3166 country codes. For the current list of countries and the corresponding codes, see ISO 3166-1-alpha-2 code on the International Organization for Standardization website. You can also refer to the country list on the CloudFront console, which includes both country names and codes."
					}
				},
				"required": ["RestrictionType", "Quantity"],
				"additionalProperties": false
			},
			"CloudFront.GeoRestrictionType": {
				"type": "string"
			},
			"CloudFront.LocationList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CloudFront.HttpVersion": {
				"type": "string"
			},
			"CloudFront.AliasICPRecordals": {
				"type": "array",
				"items": {
					"$ref": "#/$defs/CloudFront.AliasICPRecordal"
				}
			},
			"CloudFront.AliasICPRecordal": {
				"type": "object",
				"properties": {
					"CNAME": {
						"type": "string",
						"description": "A domain name associated with a distribution."
					},
					"ICPRecordalStatus": {
						"$ref": "#/$defs/CloudFront.ICPRecordalStatus",
						"description": "The Internet Content Provider (ICP) recordal status for a CNAME. The ICPRecordalStatus is set to APPROVED for all CNAMEs (aliases) in regions outside of China.  The status values returned are the following:    APPROVED indicates that the associated CNAME has a valid ICP recordal number. Multiple CNAMEs can be associated with a distribution, and CNAMEs can correspond to different ICP recordals. To be marked as APPROVED, that is, valid to use with China region, a CNAME must have one ICP recordal number associated with it.    SUSPENDED indicates that the associated CNAME does not have a valid ICP recordal number.    PENDING indicates that CloudFront can't determine the ICP recordal status of the CNAME associated with the distribution because there was an error in trying to determine the status. You can try again to see if the error is resolved in which case CloudFront returns an APPROVED or SUSPENDED status."
					}
				},
				"additionalProperties": false
			},
			"CloudFront.ICPRecordalStatus": {
				"type": "string"
			},
			"ListDistributionsInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"maxItems": {
						"type": "string",
						"title": "Max Items",
						"description": "The maximum number of distributions you want in the response body."
					}
				},
				"required": ["region"],
				"additionalProperties": false
			},
			"Region": {
				"type": "string",
				"enum": [
					"af-south-1",
					"ap-east-1",
					"ap-northeast-1",
					"ap-northeast-2",
					"ap-northeast-3",
					"ap-south-1",
					"ap-southeast-1",
					"ap-southeast-2",
					"ca-central-1",
					"eu-central-1",
					"eu-north-1",
					"eu-south-1",
					"eu-west-1",
					"eu-west-2",
					"eu-west-3",
					"me-south-1",
					"sa-east-1",
					"us-east-1",
					"us-east-2",
					"us-gov-east-1",
					"us-gov-west-1",
					"us-west-1",
					"us-west-2"
				]
			},
			"ListDistributionsByWebACLOutputs": {
				"type": "object",
				"properties": {
					"items": {
						"type": "array",
						"items": {
							"$ref": "#/$defs/CloudFront.DistributionSummary"
						}
					},
					"quantity": {
						"type": "number"
					},
					"isTruncated": {
						"type": "boolean"
					}
				},
				"required": ["items"],
				"additionalProperties": false
			},
			"ListDistributionsByWebACLInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"webAclId": {
						"type": "string",
						"title": "Web ACL Id",
						"description": "The ID of the WAF web ACL that you want to list the associated distributions. If you specify \"null\" for the ID, the request returns a list of the distributions that aren't associated with a web ACL."
					},
					"maxItems": {
						"type": "string",
						"title": "Max Items",
						"description": "The maximum number of distributions you want in the response body."
					}
				},
				"required": ["region", "webAclId"],
				"additionalProperties": false
			},
			"CreateInvalidationOutputs": {
				"type": "object",
				"properties": {
					"id": {
						"type": "string"
					},
					"status": {
						"type": "string"
					},
					"createTime": {
						"type": "string",
						"format": "date-time"
					},
					"invalidationBatch": {
						"$ref": "#/$defs/CloudFront.InvalidationBatch"
					},
					"location": {
						"type": "string"
					}
				},
				"required": ["id", "status", "createTime", "invalidationBatch"],
				"additionalProperties": false
			},
			"CloudFront.InvalidationBatch": {
				"type": "object",
				"properties": {
					"Paths": {
						"$ref": "#/$defs/CloudFront.Paths",
						"description": "A complex type that contains information about the objects that you want to invalidate. For more information, see Specifying the Objects to Invalidate in the Amazon CloudFront Developer Guide."
					},
					"CallerReference": {
						"type": "string",
						"description": "A value that you specify to uniquely identify an invalidation request. CloudFront uses the value to prevent you from accidentally resubmitting an identical request. Whenever you create a new invalidation request, you must specify a new value for CallerReference and change other values in the request as applicable. One way to ensure that the value of CallerReference is unique is to use a timestamp, for example, 20120301090000. If you make a second invalidation request with the same value for CallerReference, and if the rest of the request is the same, CloudFront doesn't create a new invalidation request. Instead, CloudFront returns information about the invalidation request that you previously created with the same CallerReference. If CallerReference is a value you already sent in a previous invalidation batch request but the content of any Path is different from the original request, CloudFront returns an InvalidationBatchAlreadyExists error."
					}
				},
				"required": ["Paths", "CallerReference"],
				"additionalProperties": false
			},
			"CloudFront.Paths": {
				"type": "object",
				"properties": {
					"Quantity": {
						"$ref": "#/$defs/CloudFront.integer",
						"description": "The number of invalidation paths specified for the objects that you want to invalidate."
					},
					"Items": {
						"$ref": "#/$defs/CloudFront.PathList",
						"description": "A complex type that contains a list of the paths that you want to invalidate."
					}
				},
				"required": ["Quantity"],
				"additionalProperties": false
			},
			"CloudFront.PathList": {
				"type": "array",
				"items": {
					"type": "string"
				}
			},
			"CreateInvalidationInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"distributionId": {
						"type": "string",
						"title": "Distribution ID"
					},
					"paths": {
						"type": "array",
						"items": {
							"type": "string"
						},
						"examples": [["/example-path/example-file.jpg"]],
						"title": "Paths",
						"description": "A list of the paths that you want to invalidate. For more information, see [Specifying the Objects to Invalidate](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html#invalidation-specifying-objects \"{isExternal}\") in the Amazon CloudFront Developer Guide."
					},
					"waitForCompletion": {
						"type": "boolean",
						"title": "Wait for completion",
						"description": "Whether the workflow should wait for the creation request to complete before continuing.",
						"default": true
					}
				},
				"required": ["region", "distributionId", "paths"],
				"additionalProperties": false
			},
			"GetInvalidationOutputs": {
				"type": "object",
				"properties": {
					"id": {
						"type": "string"
					},
					"status": {
						"type": "string"
					},
					"createTime": {
						"type": "string",
						"format": "date-time"
					},
					"invalidationBatch": {
						"$ref": "#/$defs/CloudFront.InvalidationBatch"
					}
				},
				"required": ["id", "status", "createTime", "invalidationBatch"],
				"additionalProperties": false
			},
			"GetInvalidationInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"distributionId": {
						"type": "string",
						"title": "Distribution ID"
					},
					"id": {
						"type": "string",
						"examples": ["IDFDVBD632BHDS5"],
						"title": "Invalidation ID"
					}
				},
				"required": ["region", "distributionId", "id"],
				"additionalProperties": false
			},
			"ListInvalidationsOutputs": {
				"type": "object",
				"properties": {
					"items": {
						"type": "array",
						"items": {
							"$ref": "#/$defs/CloudFront.InvalidationSummary"
						}
					},
					"quantity": {
						"type": "number"
					},
					"isTruncated": {
						"type": "boolean"
					}
				},
				"required": ["items"],
				"additionalProperties": false
			},
			"CloudFront.InvalidationSummary": {
				"type": "object",
				"properties": {
					"Id": {
						"type": "string",
						"description": "The unique ID for an invalidation request."
					},
					"CreateTime": {
						"$ref": "#/$defs/CloudFront.timestamp",
						"description": "The time that an invalidation request was created."
					},
					"Status": {
						"type": "string",
						"description": "The status of an invalidation request."
					}
				},
				"required": ["Id", "CreateTime", "Status"],
				"additionalProperties": false
			},
			"ListInvalidationsInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"distributionId": {
						"type": "string",
						"title": "Distribution ID"
					},
					"maxItems": {
						"type": "string",
						"title": "Max items",
						"description": "The maximum number of distributions you want in the response body."
					}
				},
				"required": ["region", "distributionId"],
				"additionalProperties": false
			},
			"GetAWSCloudFrontDistributionOutputs": {
				"type": "object",
				"properties": {
					"distribution": {
						"type": "object",
						"properties": {
							"DistributionConfig": {
								"type": "object",
								"properties": {
									"Logging": {
										"type": "object",
										"properties": {
											"IncludeCookies": {
												"type": "boolean",
												"title": "Include Cookies",
												"default": false
											},
											"Bucket": {
												"type": "string",
												"title": "Bucket"
											},
											"Prefix": {
												"type": "string",
												"title": "Prefix"
											}
										},
										"required": ["Bucket"],
										"additionalProperties": false,
										"title": "Logging"
									},
									"Comment": {
										"type": "string",
										"title": "Comment"
									},
									"DefaultRootObject": {
										"type": "string",
										"title": "Default Root Object"
									},
									"Origins": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"ConnectionTimeout": {
													"type": "number",
													"title": "Connection Timeout"
												},
												"ConnectionAttempts": {
													"type": "number",
													"title": "Connection Attempts"
												},
												"OriginCustomHeaders": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"HeaderValue": {
																"type": "string",
																"title": "Header Value"
															},
															"HeaderName": {
																"type": "string",
																"title": "Header Name"
															}
														},
														"required": ["HeaderValue", "HeaderName"],
														"additionalProperties": false
													},
													"title": "Origin Custom Headers"
												},
												"DomainName": {
													"type": "string",
													"title": "Domain Name"
												},
												"OriginShield": {
													"type": "object",
													"properties": {
														"OriginShieldRegion": {
															"type": "string",
															"title": "Origin Shield Region"
														},
														"Enabled": {
															"type": "boolean",
															"title": "Enabled"
														}
													},
													"additionalProperties": false,
													"title": "Origin Shield"
												},
												"S3OriginConfig": {
													"type": "object",
													"properties": {
														"OriginAccessIdentity": {
															"type": "string",
															"title": "Origin Access Identity"
														}
													},
													"additionalProperties": false,
													"title": "S3Origin Config"
												},
												"OriginPath": {
													"type": "string",
													"title": "Origin Path"
												},
												"Id": {
													"type": "string",
													"title": "ID"
												},
												"CustomOriginConfig": {
													"type": "object",
													"properties": {
														"OriginReadTimeout": {
															"type": "number",
															"title": "Origin Read Timeout",
															"default": 30
														},
														"HTTPSPort": {
															"type": "number",
															"title": "HTTPSPort",
															"default": 443
														},
														"OriginKeepaliveTimeout": {
															"type": "number",
															"title": "Origin Keepalive Timeout",
															"default": 5
														},
														"OriginSSLProtocols": {
															"type": "array",
															"items": {
																"type": "string"
															},
															"title": "Origin SSLProtocols",
															"default": ["TLSv1", "SSLv3"]
														},
														"HTTPPort": {
															"type": "number",
															"title": "HTTPPort",
															"default": 80
														},
														"OriginProtocolPolicy": {
															"type": "string",
															"title": "Origin Protocol Policy"
														}
													},
													"required": ["OriginProtocolPolicy"],
													"additionalProperties": false,
													"title": "Custom Origin Config"
												}
											},
											"required": ["DomainName", "Id"],
											"additionalProperties": false
										},
										"title": "Origins"
									},
									"ViewerCertificate": {
										"type": "object",
										"properties": {
											"IamCertificateId": {
												"type": "string",
												"title": "Iam Certificate ID"
											},
											"SslSupportMethod": {
												"type": "string",
												"title": "Ssl Support Method"
											},
											"MinimumProtocolVersion": {
												"type": "string",
												"title": "Minimum Protocol Version"
											},
											"CloudFrontDefaultCertificate": {
												"type": "boolean",
												"title": "Cloud Front Default Certificate"
											},
											"AcmCertificateArn": {
												"type": "string",
												"title": "Acm Certificate Arn"
											}
										},
										"additionalProperties": false,
										"title": "Viewer Certificate",
										"default": {
											"CloudFrontDefaultCertificate": true
										}
									},
									"PriceClass": {
										"type": "string",
										"title": "Price Class",
										"default": "PriceClass_All"
									},
									"CustomOrigin": {
										"type": "object",
										"properties": {
											"HTTPSPort": {
												"type": "number",
												"title": "HTTPSPort",
												"default": 443
											},
											"OriginSSLProtocols": {
												"type": "array",
												"items": {
													"type": "string"
												},
												"title": "Origin SSLProtocols",
												"default": ["TLSv1", "SSLv3"]
											},
											"DNSName": {
												"type": "string",
												"title": "DNSName"
											},
											"HTTPPort": {
												"type": "number",
												"title": "HTTPPort",
												"default": 80
											},
											"OriginProtocolPolicy": {
												"type": "string",
												"title": "Origin Protocol Policy"
											}
										},
										"required": [
											"OriginSSLProtocols",
											"DNSName",
											"OriginProtocolPolicy"
										],
										"additionalProperties": false,
										"title": "Custom Origin"
									},
									"S3Origin": {
										"type": "object",
										"properties": {
											"OriginAccessIdentity": {
												"type": "string",
												"title": "Origin Access Identity"
											},
											"DNSName": {
												"type": "string",
												"title": "DNSName"
											}
										},
										"required": ["DNSName"],
										"additionalProperties": false,
										"title": "S3Origin"
									},
									"DefaultCacheBehavior": {
										"type": "object",
										"properties": {
											"Compress": {
												"type": "boolean",
												"title": "Compress",
												"default": false
											},
											"FunctionAssociations": {
												"type": "array",
												"items": {
													"type": "object",
													"properties": {
														"FunctionARN": {
															"type": "string",
															"title": "Function ARN"
														},
														"EventType": {
															"type": "string",
															"title": "Event Type"
														}
													},
													"additionalProperties": false
												},
												"title": "Function Associations"
											},
											"LambdaFunctionAssociations": {
												"type": "array",
												"items": {
													"type": "object",
													"properties": {
														"IncludeBody": {
															"type": "boolean",
															"title": "Include Body"
														},
														"EventType": {
															"type": "string",
															"title": "Event Type"
														},
														"LambdaFunctionARN": {
															"type": "string",
															"title": "Lambda Function ARN"
														}
													},
													"additionalProperties": false
												},
												"title": "Lambda Function Associations"
											},
											"TargetOriginId": {
												"type": "string",
												"title": "Target Origin ID"
											},
											"ViewerProtocolPolicy": {
												"type": "string",
												"title": "Viewer Protocol Policy"
											},
											"ResponseHeadersPolicyId": {
												"type": "string",
												"title": "Response Headers Policy ID"
											},
											"RealtimeLogConfigArn": {
												"type": "string",
												"title": "Realtime Log Config Arn"
											},
											"TrustedSigners": {
												"type": "array",
												"items": {
													"type": "string"
												},
												"title": "Trusted Signers"
											},
											"DefaultTTL": {
												"type": "number",
												"title": "Default TTL",
												"default": 86400
											},
											"FieldLevelEncryptionId": {
												"type": "string",
												"title": "Field Level Encryption ID"
											},
											"TrustedKeyGroups": {
												"type": "array",
												"items": {
													"type": "string"
												},
												"title": "Trusted Key Groups"
											},
											"AllowedMethods": {
												"type": "array",
												"items": {
													"type": "string"
												},
												"title": "Allowed Methods",
												"default": ["GET", "HEAD"]
											},
											"CachedMethods": {
												"type": "array",
												"items": {
													"type": "string"
												},
												"title": "Cached Methods",
												"default": ["GET", "HEAD"]
											},
											"SmoothStreaming": {
												"type": "boolean",
												"title": "Smooth Streaming",
												"default": false
											},
											"ForwardedValues": {
												"type": "object",
												"properties": {
													"Cookies": {
														"type": "object",
														"properties": {
															"WhitelistedNames": {
																"type": "array",
																"items": {
																	"type": "string"
																},
																"title": "Whitelisted Names"
															},
															"Forward": {
																"type": "string",
																"title": "Forward"
															}
														},
														"required": ["Forward"],
														"additionalProperties": false,
														"title": "Cookies",
														"default": {
															"Forward": "none"
														}
													},
													"Headers": {
														"type": "array",
														"items": {
															"type": "string"
														},
														"title": "Headers"
													},
													"QueryString": {
														"type": "boolean",
														"title": "Query String"
													},
													"QueryStringCacheKeys": {
														"type": "array",
														"items": {
															"type": "string"
														},
														"title": "Query String Cache Keys"
													}
												},
												"required": ["QueryString"],
												"additionalProperties": false,
												"title": "Forwarded Values"
											},
											"OriginRequestPolicyId": {
												"type": "string",
												"title": "Origin Request Policy ID"
											},
											"MinTTL": {
												"type": "number",
												"title": "Min TTL",
												"default": 0
											},
											"CachePolicyId": {
												"type": "string",
												"title": "Cache Policy ID"
											},
											"MaxTTL": {
												"type": "number",
												"title": "Max TTL",
												"default": 31536000
											}
										},
										"required": ["TargetOriginId", "ViewerProtocolPolicy"],
										"additionalProperties": false,
										"title": "Default Cache Behavior"
									},
									"CustomErrorResponses": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"ResponseCode": {
													"type": "number",
													"title": "Response Code"
												},
												"ErrorCachingMinTTL": {
													"type": "number",
													"title": "Error Caching Min TTL",
													"default": 300
												},
												"ErrorCode": {
													"type": "number",
													"title": "Error Code"
												},
												"ResponsePagePath": {
													"type": "string",
													"title": "Response Page Path"
												}
											},
											"required": ["ErrorCode"],
											"additionalProperties": false
										},
										"title": "Custom Error Responses"
									},
									"OriginGroups": {
										"type": "object",
										"properties": {
											"Quantity": {
												"type": "number",
												"title": "Quantity"
											},
											"Items": {
												"type": "array",
												"items": {
													"type": "object",
													"properties": {
														"Id": {
															"type": "string",
															"title": "ID"
														},
														"FailoverCriteria": {
															"type": "object",
															"properties": {
																"StatusCodes": {
																	"type": "object",
																	"properties": {
																		"Quantity": {
																			"type": "number",
																			"title": "Quantity"
																		},
																		"Items": {
																			"type": "array",
																			"items": {
																				"type": "number"
																			},
																			"title": "Items"
																		}
																	},
																	"required": ["Quantity", "Items"],
																	"additionalProperties": false,
																	"title": "Status Codes"
																}
															},
															"required": ["StatusCodes"],
															"additionalProperties": false,
															"title": "Failover Criteria"
														},
														"Members": {
															"type": "object",
															"properties": {
																"Quantity": {
																	"type": "number",
																	"title": "Quantity"
																},
																"Items": {
																	"type": "array",
																	"items": {
																		"type": "object",
																		"properties": {
																			"OriginId": {
																				"type": "string",
																				"title": "Origin ID"
																			}
																		},
																		"required": ["OriginId"],
																		"additionalProperties": false
																	},
																	"title": "Items"
																}
															},
															"required": ["Quantity", "Items"],
															"additionalProperties": false,
															"title": "Members"
														}
													},
													"required": ["Id", "FailoverCriteria", "Members"],
													"additionalProperties": false
												},
												"title": "Items"
											}
										},
										"required": ["Quantity"],
										"additionalProperties": false,
										"title": "Origin Groups"
									},
									"Enabled": {
										"type": "boolean",
										"title": "Enabled"
									},
									"Aliases": {
										"type": "array",
										"items": {
											"type": "string"
										},
										"title": "Aliases"
									},
									"IPV6Enabled": {
										"type": "boolean",
										"title": "IPV6Enabled"
									},
									"CNAMEs": {
										"type": "array",
										"items": {
											"type": "string"
										},
										"title": "CNAMEs"
									},
									"WebACLId": {
										"type": "string",
										"title": "Web ACLID"
									},
									"HttpVersion": {
										"type": "string",
										"title": "Http Version",
										"default": "http1.1"
									},
									"Restrictions": {
										"type": "object",
										"properties": {
											"GeoRestriction": {
												"type": "object",
												"properties": {
													"Locations": {
														"type": "array",
														"items": {
															"type": "string"
														},
														"title": "Locations"
													},
													"RestrictionType": {
														"type": "string",
														"title": "Restriction Type"
													}
												},
												"required": ["RestrictionType"],
												"additionalProperties": false,
												"title": "Geo Restriction"
											}
										},
										"required": ["GeoRestriction"],
										"additionalProperties": false,
										"title": "Restrictions",
										"default": {
											"GeoRestriction": {
												"RestrictionType": "none"
											}
										}
									},
									"CacheBehaviors": {
										"type": "array",
										"items": {
											"type": "object",
											"properties": {
												"Compress": {
													"type": "boolean",
													"title": "Compress",
													"default": false
												},
												"FunctionAssociations": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"FunctionARN": {
																"type": "string",
																"title": "Function ARN"
															},
															"EventType": {
																"type": "string",
																"title": "Event Type"
															}
														},
														"additionalProperties": false
													},
													"title": "Function Associations"
												},
												"LambdaFunctionAssociations": {
													"type": "array",
													"items": {
														"type": "object",
														"properties": {
															"IncludeBody": {
																"type": "boolean",
																"title": "Include Body"
															},
															"EventType": {
																"type": "string",
																"title": "Event Type"
															},
															"LambdaFunctionARN": {
																"type": "string",
																"title": "Lambda Function ARN"
															}
														},
														"additionalProperties": false
													},
													"title": "Lambda Function Associations"
												},
												"TargetOriginId": {
													"type": "string",
													"title": "Target Origin ID"
												},
												"ViewerProtocolPolicy": {
													"type": "string",
													"title": "Viewer Protocol Policy"
												},
												"ResponseHeadersPolicyId": {
													"type": "string",
													"title": "Response Headers Policy ID"
												},
												"RealtimeLogConfigArn": {
													"type": "string",
													"title": "Realtime Log Config Arn"
												},
												"TrustedSigners": {
													"type": "array",
													"items": {
														"type": "string"
													},
													"title": "Trusted Signers"
												},
												"DefaultTTL": {
													"type": "number",
													"title": "Default TTL",
													"default": 86400
												},
												"FieldLevelEncryptionId": {
													"type": "string",
													"title": "Field Level Encryption ID"
												},
												"TrustedKeyGroups": {
													"type": "array",
													"items": {
														"type": "string"
													},
													"title": "Trusted Key Groups"
												},
												"AllowedMethods": {
													"type": "array",
													"items": {
														"type": "string"
													},
													"title": "Allowed Methods",
													"default": ["GET", "HEAD"]
												},
												"PathPattern": {
													"type": "string",
													"title": "Path Pattern"
												},
												"CachedMethods": {
													"type": "array",
													"items": {
														"type": "string"
													},
													"title": "Cached Methods",
													"default": ["GET", "HEAD"]
												},
												"SmoothStreaming": {
													"type": "boolean",
													"title": "Smooth Streaming",
													"default": false
												},
												"ForwardedValues": {
													"type": "object",
													"properties": {
														"Cookies": {
															"type": "object",
															"properties": {
																"WhitelistedNames": {
																	"type": "array",
																	"items": {
																		"type": "string"
																	},
																	"title": "Whitelisted Names"
																},
																"Forward": {
																	"type": "string",
																	"title": "Forward"
																}
															},
															"required": ["Forward"],
															"additionalProperties": false,
															"title": "Cookies",
															"default": {
																"Forward": "none"
															}
														},
														"Headers": {
															"type": "array",
															"items": {
																"type": "string"
															},
															"title": "Headers"
														},
														"QueryString": {
															"type": "boolean",
															"title": "Query String"
														},
														"QueryStringCacheKeys": {
															"type": "array",
															"items": {
																"type": "string"
															},
															"title": "Query String Cache Keys"
														}
													},
													"required": ["QueryString"],
													"additionalProperties": false,
													"title": "Forwarded Values"
												},
												"OriginRequestPolicyId": {
													"type": "string",
													"title": "Origin Request Policy ID"
												},
												"MinTTL": {
													"type": "number",
													"title": "Min TTL",
													"default": 0
												},
												"CachePolicyId": {
													"type": "string",
													"title": "Cache Policy ID"
												},
												"MaxTTL": {
													"type": "number",
													"title": "Max TTL",
													"default": 31536000
												}
											},
											"required": [
												"TargetOriginId",
												"ViewerProtocolPolicy",
												"PathPattern"
											],
											"additionalProperties": false
										},
										"title": "Cache Behaviors"
									}
								},
								"required": ["Enabled"],
								"additionalProperties": false,
								"title": "Distribution Config"
							},
							"DomainName": {
								"type": "string",
								"title": "Domain Name"
							},
							"Id": {
								"type": "string",
								"title": "ID"
							},
							"Tags": {
								"type": "array",
								"items": {
									"type": "object",
									"properties": {
										"Value": {
											"type": "string",
											"title": "Value"
										},
										"Key": {
											"type": "string",
											"title": "Key"
										}
									},
									"required": ["Value", "Key"],
									"additionalProperties": false
								},
								"title": "Tags"
							}
						},
						"additionalProperties": false
					}
				},
				"required": ["distribution"],
				"additionalProperties": false
			},
			"GetAWSCloudFrontDistributionInputs": {
				"type": "object",
				"properties": {
					"region": {
						"$ref": "#/$defs/Region",
						"title": "Region",
						"default": "us-east-1"
					},
					"resourceId": {
						"type": "string",
						"title": "Resource ID"
					}
				},
				"required": ["region", "resourceId"],
				"additionalProperties": false
			}
		}
	},
	"title": "AWS CloudFront",
	"description": "Create invalidations in your CloudFront distributions, and list or describe your distributions and invalidations.",
	"icon": {
		"type": "integration_logo",
		"integration_id": "amazon-cloudfront"
	},
	"name": "com.datadoghq.aws.cloudfront",
	"documentation_url": "https://docs.aws.amazon.com/cloudfront/index.html",
	"stability": "stable",
	"actions": {
		"list_distributions": {
			"title": "List distributions",
			"description": "List CloudFront distributions. A distribution tells CloudFront where you want content to be delivered from, and the details about how to track and manage content delivery.",
			"input": "#/$defs/ListDistributionsInputs",
			"output": "#/$defs/ListDistributionsOutputs",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:ListDistributions"],
			"keywords": ["all", "list"],
			"inputFieldOrder": ["region", "maxItems"]
		},
		"list_distributions_by_web_acl": {
			"title": "List distributions by Web ACL",
			"description": "List the distributions that are associated with a specified WAF web ACL.",
			"input": "#/$defs/ListDistributionsByWebACLInputs",
			"output": "#/$defs/ListDistributionsByWebACLOutputs",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:ListDistributionsByWebACLId"],
			"keywords": ["all", "list"],
			"inputFieldOrder": ["region", "webAclId", "maxItems"]
		},
		"create_invalidation": {
			"title": "Create invalidation",
			"description": "Create a new invalidation.",
			"input": "#/$defs/CreateInvalidationInputs",
			"output": "#/$defs/CreateInvalidationOutputs",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:CreateInvalidation"],
			"inputFieldOrder": [
				"region",
				"distributionId",
				"paths",
				"waitForCompletion"
			]
		},
		"get_invalidation": {
			"title": "Describe invalidation",
			"description": "Get the information about an invalidation.",
			"input": "#/$defs/GetInvalidationInputs",
			"output": "#/$defs/GetInvalidationOutputs",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:GetInvalidation"],
			"keywords": ["describe", "get"],
			"inputFieldOrder": ["region", "distributionId", "id"]
		},
		"list_invalidations": {
			"title": "List invalidations",
			"description": "Lists invalidation batches.",
			"input": "#/$defs/ListInvalidationsInputs",
			"output": "#/$defs/ListInvalidationsOutputs",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:ListInvalidations"],
			"keywords": ["all", "list"],
			"inputFieldOrder": ["region", "distributionId", "maxItems"]
		},
		"getAWSCloudFrontDistribution": {
			"title": "Describe Distribution",
			"description": "Get details about a distribution",
			"input": "#/$defs/GetAWSCloudFrontDistributionInputs",
			"output": "#/$defs/GetAWSCloudFrontDistributionOutputs",
			"stability": "stable",
			"icon": {
				"type": "integration_logo",
				"integration_id": "amazon-cloudfront"
			},
			"permissions": ["cloudfront:GetDistribution*"],
			"keywords": ["describe", "get"],
			"inputFieldOrder": ["region", "resourceId"]
		}
	},
	"schemaVersion": "v1.0.0-WD",
	"version": "0.0.1",
	"tags": ["action"]
};
  const yData = JSON.stringify(xData["types"]["$defs"]).replace(/\#\/\$defs\//g, '#/types/$defs/');
  xData["types"]["$defs"] = JSON.parse(yData);
  const fileData = xData;
  // const fileData = JSON.parse(yData);
  //console.log(fileData);
  $RefParser.dereference(fileData)
        .then((deref) => {
          //const html = schemaTable("request", );
          //console.log(deref);
          const derefJson = safeJsonStringify(deref, null, 2);
          const html = schemaTable("request", deref['types']['$defs']['ListDistributionsOutputs']);
          console.log(html);
        });
  //console.log(html);
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
