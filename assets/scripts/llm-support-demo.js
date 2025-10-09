const path = require('path');
const { htmlDirToMdoc } = require('html-to-mdoc');

const inDir = path.resolve(__dirname, '../../public/opentelemetry');
const outDir = path.resolve(__dirname, '../../opentelemetry-mdoc');
console.log(`Converting HTML files in ${inDir} to .mdoc files in ${outDir}`);

htmlDirToMdoc({
    inDir,
    outDir,
    options: {
        purgeOutDirBeforeProcessing: true
    }
}).then((result) => {
    console.log(result.stats);
});
