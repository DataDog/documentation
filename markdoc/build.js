/**
 * This script runs as part of the build, before Hugo has processed any files.
 * It invokes the Markdoc integration to compile all .mdoc files
 * found in the content directory, and updates the .gitignore file
 * in that directory to ignore the compiled files.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const MarkdocHugoIntegration = require('./markdoc-hugo-integration/dist').MarkdocHugoIntegration;

const env = process.env.CI_ENVIRONMENT_NAME || 'development';

// Load the site params from the appropriate files
const defaultSiteParamsFile = path.resolve(__dirname, '../config/_default/params.yaml');
// const defaultSiteParams = yaml.safeLoad(fs.readFileSync(defaultSiteParamsFile, 'utf8'));
const defaultSiteParams = {};
const envSiteParamsFile = path.resolve(__dirname, `../config/${env}/params.yaml`);
const envSiteParams = yaml.safeLoad(fs.readFileSync(envSiteParamsFile, 'utf8'));
const siteParams = Object.assign({}, defaultSiteParams, envSiteParams);

// Load the languages from the appropriate file
const languagesFile = path.resolve(__dirname, '../config/_default/languages.yaml');
const languagesConfig = yaml.safeLoad(fs.readFileSync(languagesFile, 'utf8'));
const languages = Object.keys(languagesConfig);

console.time('Markdoc compilation execution time');

const ASSETS_PARTIAL_PATH = path.resolve(__dirname, '../layouts/partials/markdoc-assets.html');
const CONTENT_DIR = path.resolve(__dirname, '../content');
const PARTIALS_DIR = path.resolve(__dirname, '../mdoc_partials');
const PREFS_CONFIG_DIR = path.resolve(__dirname, '../config/_default/preferences/en/option_sets');

// Initialize the Markdoc integration
const markdocIntegration = new MarkdocHugoIntegration({
    directories: {
        content: CONTENT_DIR,
        options: PREFS_CONFIG_DIR,
        partials: PARTIALS_DIR
    },
    hugoConfig: {
        siteParams,
        languages,
        env
    }
});

// Build the assets partial, and write it to the target file path
const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

// Compile all .mdoc files found in the content directory
const { compiledFiles, hasErrors } = markdocIntegration.compileMdocFiles();

// Build a .gitignore file for the compiled files,
// to be written to the content directory
let gitignoreContents = `# GENERATED FILE: DO NOT EDIT
# Ignore .md files compiled from Markdoc\n`;
compiledFiles.forEach((file) => {
    const sanitizedFile = file.replace(CONTENT_DIR, '');
    gitignoreContents += sanitizedFile + '\n';
});
fs.writeFileSync(CONTENT_DIR + '/.gitignore', gitignoreContents);

if (hasErrors) {
    console.error('Markdoc compilation failed with errors:');
    markdocIntegration.logErrorsToConsole();
}

console.timeEnd('Markdoc compilation execution time');
