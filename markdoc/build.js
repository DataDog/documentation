const fs = require('fs');
const path = require('path');
const MarkdocHugoIntegration = require('./markdoc-hugo-integration/dist').MarkdocHugoIntegration;

console.time('Markdoc compilation execution time');

const ASSETS_PARTIAL_PATH = path.resolve(__dirname, '../layouts/partials/markdoc-assets.html');
const CONTENT_DIR = path.resolve(__dirname, '../content/en');
const PARTIALS_DIR = path.resolve(__dirname, '../mdoc_partials');
const PREFS_CONFIG_DIR = path.resolve(__dirname, '../config/_default/preferences/en');

// Initialize the Markdoc integration
const markdocIntegration = new MarkdocHugoIntegration({
    directories: {
        content: CONTENT_DIR,
        options: PREFS_CONFIG_DIR,
        partials: PARTIALS_DIR
    }
    /*
    config: {
        debug: true
    }
    */
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
