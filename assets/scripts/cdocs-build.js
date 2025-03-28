#!/usr/bin/env node

/**
 * This script runs as part of the build, before Hugo has processed any files.
 * It invokes the Markdoc integration to compile all .mdoc files
 * found in the content directory, and updates the .gitignore file
 * in that directory to ignore the compiled files.
 */
console.time('Markdoc compilation execution time');

const fs = require('fs');
const path = require('path');

const { CdocsHugoIntegration } = require('cdocs-hugo-integration');

const env = process.env.CI_ENVIRONMENT_NAME || 'development';
const baseSiteDir = path.resolve(__dirname, '../..');

const ASSETS_PARTIAL_PATH = path.resolve(__dirname, `${baseSiteDir}/layouts/partials/markdoc-assets.html`);
const CONTENT_DIR = path.resolve(__dirname, `${baseSiteDir}/content`);

// Initialize the Markdoc integration
const markdocIntegration = new CdocsHugoIntegration({
    baseSiteDir,
    env,
    publishAuthorConsoleInDir: baseSiteDir + '/static/cdocs/console'
});

// Build the assets partial, and write it to the target file path
const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

// Compile all .mdoc files found in the content directory
const { compiledFilePaths, hasErrors } = markdocIntegration.compileMdocFiles();

console.log(`Markdoc compilation completed. Compiled ${compiledFilePaths.length} files.`);

// Read the contents of the .gitignore file in the content directory into an array of strings
let gitignoreContents = fs.readFileSync(CONTENT_DIR + '/.gitignore', 'utf8').split('\n');

// Compare gitignoreContents with compiledFilePaths
// Add any files in compiledFilePaths that are not in gitignoreContents to gitignoreContents
compiledFilePaths.forEach((file) => {
    const sanitizedFile = file.replace(CONTENT_DIR, '');
    if (!gitignoreContents.includes(sanitizedFile)) {
        gitignoreContents.push(sanitizedFile);
    }
});

// Write the updated gitignoreContents to the .gitignore file in the content directory
fs.writeFileSync(CONTENT_DIR + '/.gitignore', gitignoreContents.join('\n'));

if (hasErrors) {
    console.error('Markdoc compilation failed with errors:');
    markdocIntegration.logErrorsToConsole();
}

console.timeEnd('Markdoc compilation execution time');
