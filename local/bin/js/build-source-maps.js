// "build:sourcemaps:preview": "esbuild ./assets/scripts/main.js --sourcemap --outdir=public/scripts/",  <- cli

const esBuildModule = require('esbuild');
const scriptsDir = '../../assets/scripts';

esBuildModule.build({
  entryPoints: [`${scriptsDir}/main.js`, `${scriptsDir}/components/search.js`, `${scriptsDir}/components/dd-browser-logs-rum.js`],
  sourcemap: true,
  outdir: scriptsDir 
})