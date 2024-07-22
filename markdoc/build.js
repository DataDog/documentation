const MarkdocHugoIntegration = require('./markdoc-hugo-integration/dist').MarkdocHugoIntegration;

console.time('Markdoc compilation');
const CONTENT_DIR = __dirname + '/../content/en';
const PARTIALS_DIR = __dirname + '/../mdoc_partials';
const PREFS_CONFIG_DIR = __dirname + '/../config/_default/preferences/en';

const integration = new MarkdocHugoIntegration({
    contentDir: CONTENT_DIR,
    prefOptionsConfigDir: PREFS_CONFIG_DIR,
    partialsDir: PARTIALS_DIR
});

integration.compile();
console.timeEnd('Markdoc compilation');
