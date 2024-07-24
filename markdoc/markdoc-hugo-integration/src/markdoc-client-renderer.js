window.MarkdocClientRenderer = require('markdoc-static-compiler').renderers.incremental;
const ClientRenderer = require('../dist/helperModules/ClientRenderer').ClientRenderer;
window.clientRenderer = ClientRenderer.instance;
console.log('ClientRenderer instance created:', window.clientRenderer);
