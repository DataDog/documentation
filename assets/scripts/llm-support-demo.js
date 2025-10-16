const path = require('path');
const { htmlDirToMdoc } = require('html-to-mdoc');

const inDir = path.resolve(__dirname, '../../public/tracing');
const outDir = path.resolve(__dirname, '../../tmp/html_to_mdoc');
console.log(`Converting HTML files in ${inDir} to .mdoc files in ${outDir}`);

htmlDirToMdoc({
    inDir,
    outDir,
    options: {
        baseSiteUrl: 'https://docs.datadoghq.com',
        purgeOutDirBeforeProcessing: true
    }
}).then((result) => {
    console.log(result.stats);
});
