const { buildLlmsTxtFileContents } = require('docs-llms-txt');
const fs = require('fs');
const path = require('path');

const siteDir = path.resolve(__dirname, '../../');
buildLlmsTxtFileContents({ siteDir })
    .then((contents) => {
        const llmsTxtPath = path.join(siteDir, 'static', 'llms.txt');
        fs.writeFileSync(llmsTxtPath, contents);
    })
    .catch((error) => {
        console.error('Error generating llms.txt contents:', error);
        process.exit(1);
    });
