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
    contentDir: CONTENT_DIR,
    prefOptionsConfigDir: PREFS_CONFIG_DIR,
    partialsDir: PARTIALS_DIR
});

// Build the assets partial, and write it to the target file path
const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

// Compile all .mdoc files found in the content directory
const { compiledFiles } = markdocIntegration.compile();

// Build a .gitignore file for the compiled files,
// to be written to the content directory
console.log('Writing .gitignore file to ' + CONTENT_DIR);
let fileContents = '# Ignore .md files compiled from Markdoc\n';
compiledFiles.forEach((file) => {
    const sanitizedFile = file.replace(CONTENT_DIR, '');
    fileContents += sanitizedFile + '\n';
});
fs.writeFileSync(CONTENT_DIR + '/.gitignore', fileContents);

console.timeEnd('Markdoc compilation execution time');
