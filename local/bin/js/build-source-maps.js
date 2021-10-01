// This is needed to build and upload JS source maps to Datadog (RUM Error Tracking).
// Hugo only has support for inlining Source Maps currently.  Here we use esbuild to generate external source maps which are required to get full stack traces in RUM.
const esBuildModule = require('esbuild');
const glob = require('glob');
const scriptsDir = './assets/scripts';
const entryPoints =[glob(`${scriptsDir}/main.*.js`), `${scriptsDir}/components/search.js`, `${scriptsDir}/components/dd-browser-logs-rum.js`];

esBuildModule.buildSync({
  entryPoints,
  sourcemap: true,
  outdir: 'public/scripts',
  allowOverwrite: true,
  logLevel: 'error'
})