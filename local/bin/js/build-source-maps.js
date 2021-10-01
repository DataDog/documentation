const esBuildModule = require('esbuild');
const scriptsDir = './assets/scripts';

esBuildModule.buildSync({
  entryPoints: [`${scriptsDir}/main.*.js`, `${scriptsDir}/components/search.js`, `${scriptsDir}/components/dd-browser-logs-rum.js`],
  sourcemap: true,
  outdir: 'public/scripts',
  allowOverwrite: true,
  logLevel: 'error'
})