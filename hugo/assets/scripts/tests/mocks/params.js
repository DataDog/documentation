// Jest stand-in for Hugo's `@params` module. In the site build, Hugo passes
// `shared/regions.yaml` to the bundle; in tests, read the same file directly.
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const regionsFile = path.resolve(__dirname, '../../../../../shared/regions.yaml');

module.exports = {
    regions: yaml.safeLoad(fs.readFileSync(regionsFile, 'utf8')).regions
};
