const esBuildModule = require('esbuild');
const scriptsDir = './assets/scripts';
const entryPoints =[`${scriptsDir}/main.**.js`, `${scriptsDir}/components/search.js`, `${scriptsDir}/components/dd-browser-logs-rum.js`];

esBuildModule.buildSync({
  entryPoints,
  sourcemap: true,
  outdir: 'public/scripts',
  allowOverwrite: true,
  logLevel: 'error'
})