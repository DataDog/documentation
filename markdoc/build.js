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
const defaultSiteParams = yaml.safeLoad(fs.readFileSync(defaultSiteParamsFile, 'utf8'));
const envSiteParamsFile = path.resolve(__dirname, `../config/${env}/params.yaml`);
const envSiteParams = yaml.safeLoad(fs.readFileSync(envSiteParamsFile, 'utf8'));
const siteParams = Object.assign({}, defaultSiteParams, envSiteParams);

// Load the site config from the appropriate files
const defaultSiteConfigFile = path.resolve(__dirname, '../config/_default/config.yaml');
const defaultSiteConfig = yaml.safeLoad(fs.readFileSync(defaultSiteConfigFile, 'utf8'));
const envSiteConfigFile = path.resolve(__dirname, `../config/${env}/config.yaml`);
const envSiteConfig = yaml.safeLoad(fs.readFileSync(envSiteConfigFile, 'utf8'));
const siteConfig = Object.assign({}, defaultSiteConfig, envSiteConfig);

// Load the languages from the appropriate file
const languagesFile = path.resolve(__dirname, '../config/_default/languages.yaml');
const languagesConfig = yaml.safeLoad(fs.readFileSync(languagesFile, 'utf8'));
const languages = Object.keys(languagesConfig);

console.time('Markdoc compilation execution time');

const ASSETS_PARTIAL_PATH = path.resolve(__dirname, '../layouts/partials/markdoc-assets.html');
const SITE_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.resolve(__dirname, '../content');

// Initialize the Markdoc integration
const markdocIntegration = new MarkdocHugoIntegration({
    config: {
        siteParams,
        siteConfig,
        languages,
        env,
        siteDir: SITE_DIR
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
