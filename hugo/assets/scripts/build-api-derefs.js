#!/usr/bin/env node

const $RefParser = require('@apidevtools/json-schema-ref-parser');
const yaml = require('js-yaml');
const fs = require('fs');
const safeJsonStringify = require('safe-json-stringify');
const lodash = require('lodash');

// Helper function to find spec files with fallback
// once spec files are put in assets on a regular cadence replace this with a simple array of paths
const findSpecFiles = () => {
  const versions = ['v1', 'v2'];
  const specs = [];

  versions.forEach(version => {
    const assetsPath = `./assets/api/${version}/full_spec.yaml`;
    const dataPath = `./data/api/${version}/full_spec.yaml`;

    // Try assets first, fallback to data
    if (fs.existsSync(assetsPath)) {
      specs.push(assetsPath);
      console.log(`Found spec at ${assetsPath}`);
    } else if (fs.existsSync(dataPath)) {
      specs.push(dataPath);
      console.log(`Fallback to spec at ${dataPath}`);
    } else {
      console.warn(`Warning: Could not find spec file for ${version} in either assets or data directories`);
    }
  });

  return specs;
};

// Helper function to extract version from spec path
const extractVersion = (specPath) => {
  const pathParts = specPath.split('/');
  const apiIndex = pathParts.findIndex(part => part === 'api');
  return apiIndex !== -1 && pathParts[apiIndex + 1] ? pathParts[apiIndex + 1] : null;
};

// Process a single spec file
const processSpec = async (specPath) => {
  try {
    console.log(`Processing spec: ${specPath}`);

    const fileData = yaml.safeLoad(fs.readFileSync(specPath, 'utf8'));
    const deref = await $RefParser.dereference(fileData, { resolve: { external: false } });

    // VALIDATION: Ensure we actually have an object with servers
    if (!deref || typeof deref !== 'object' || Array.isArray(deref)) {
      throw new Error(`Deref produced invalid type: ${typeof deref}`);
    }

    const version = extractVersion(specPath);
    if (!version) {
      throw new Error(`Could not extract version from path: ${specPath}`);
    }

    // Write dereferenced JSON
    const jsonString = safeJsonStringify(deref, null, 2);
    // Safety check to prevent writing "null" or empty strings
    if (jsonString === "null" || jsonString === '""' || jsonString.length < 5) {
      throw new Error(`Aborting write: generated JSON for ${version} is suspiciously small or null.`);
    }
    const pathToJson = `./data/api/${version}/full_spec_deref.json`;
    fs.writeFileSync(pathToJson, jsonString, 'utf8');
    console.log(`Written dereferenced spec to: ${pathToJson}`);

    // Create Postman-compatible copy (strip empty tags)
    const derefStripEmptyTags = lodash.cloneDeep(deref);
    derefStripEmptyTags.tags = derefStripEmptyTags.tags.filter(
      (tag) => !tag.description.toLowerCase().includes("see api version")
    );
    const jsonStringStripEmptyTags = safeJsonStringify(derefStripEmptyTags, null, 2);
    const postmanPath = `./static/resources/json/full_spec_${version}.json`;
    fs.writeFileSync(postmanPath, jsonStringStripEmptyTags, 'utf8');
    console.log(`Written Postman spec to: ${postmanPath}`);

    return { fileData, deref, version };

  } catch (error) {
    console.error(`Error processing spec ${specPath}:`, error.message);
    throw error;
  }
};

const processSpecs = async (specs) => {
  if (!specs || specs.length === 0) {
    console.warn('No specs to process');
    return;
  }

  const results = [];

  try {
    // Process all specs concurrently
    const processPromises = specs.map(spec => processSpec(spec));
    const processedSpecs = await Promise.all(processPromises);
    results.push(...processedSpecs);
    console.log(`Successfully processed ${results.length} spec(s)`);
  } catch (error) {
    console.error('Failed to process specs:', error.message);
    process.exitCode = 1;
    return;
  }

  return results;
};

(async () => {
  try {
    await processSpecs(findSpecFiles());
    console.log('Processing complete');
  } catch (error) {
    console.error('Processing failed:', error);
    process.exit(1);
  }
})();
