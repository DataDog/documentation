/**
 * This script runs as part of the build, before Hugo has processed any files.
 * It invokes the Markdoc integration to compile all .mdoc files
 * found in the content directory, and updates the .gitignore file
 * in that directory to ignore the compiled files.
 */
console.time('Markdoc compilation execution time');

const fs = require('fs');
const path = require('path');

const MarkdocHugoIntegration = require('./markdoc-hugo-integration/dist').MarkdocHugoIntegration;

const env = process.env.CI_ENVIRONMENT_NAME || 'development';
const baseSiteDir = path.resolve(__dirname, '..');

const ASSETS_PARTIAL_PATH = path.resolve(__dirname, '../layouts/partials/markdoc-assets.html');
const CONTENT_DIR = path.resolve(__dirname, '../content');

// Initialize the Markdoc integration
const markdocIntegration = new MarkdocHugoIntegration({
    config: {
        baseSiteDir,
        env
    }
});

// Build the assets partial, and write it to the target file path
const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

// Compile all .mdoc files found in the content directory
const { compiledFilePaths, hasErrors } = markdocIntegration.compileMdocFiles();

// Inject the author console

if (env === 'development') {
    (async () => {
        try {
            await markdocIntegration.injectAuthorConsole();
            console.log('Author console injected successfully');
        } catch (error) {
            console.error('Failed to inject author console:', error);
        }
    })();
}

// Build a .gitignore file for the compiled files,
// to be written to the content directory
let gitignoreContents = `# GENERATED FILE: DO NOT EDIT
# Ignore .md files compiled from Markdoc\n`;

compiledFilePaths.forEach((file) => {
    const sanitizedFile = file.replace(CONTENT_DIR, '');
    gitignoreContents += sanitizedFile + '\n';
});

fs.writeFileSync(CONTENT_DIR + '/.gitignore', gitignoreContents);

if (hasErrors) {
    console.error('Markdoc compilation failed with errors:');
    markdocIntegration.logErrorsToConsole();
}

console.timeEnd('Markdoc compilation execution time');
