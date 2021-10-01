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