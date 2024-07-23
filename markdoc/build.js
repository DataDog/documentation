const fs = require('fs');

const MarkdocHugoIntegration = require('./markdoc-hugo-integration/dist').MarkdocHugoIntegration;
const ASSETS_PARTIAL_PATH = __dirname + '/../layouts/partials/markdoc-assets.html';

console.time('Markdoc compilation');
const CONTENT_DIR = __dirname + '/../content/en';
const PARTIALS_DIR = __dirname + '/../mdoc_partials';
const PREFS_CONFIG_DIR = __dirname + '/../config/_default/preferences/en';

const markdocIntegration = new MarkdocHugoIntegration({
    contentDir: CONTENT_DIR,
    prefOptionsConfigDir: PREFS_CONFIG_DIR,
    partialsDir: PARTIALS_DIR
});

const assetsPartialContents = markdocIntegration.buildAssetsPartial();
fs.writeFileSync(ASSETS_PARTIAL_PATH, assetsPartialContents);

markdocIntegration.compile();
console.timeEnd('Markdoc compilation');
