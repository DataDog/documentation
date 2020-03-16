const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');

const apiV1FullSpecYaml = yaml.safeLoad(
    fs.readFileSync('./data/api/v1/full_spec.yaml', 'utf8')
);

const apiV2FullSpecYaml = yaml.safeLoad(
    fs.readFileSync('./data/api/v2/full_spec.yaml', 'utf8')
);

function lookUpTag(lookupTag){
    for (const [path, tag] of Object.entries(apiV1FullSpecYaml.tags)){
        if (tag.name === lookupTag) {
            return tag.description;
        }
        return null;
    }
    return null;
}

function buildAPIPages (apiYaml, apiVersion){
    for (const [path, actions] of Object.entries(apiV1FullSpecYaml.paths)) {
    
        for (const [key, action] of Object.entries(actions)) {
            const { operationId, tags, summary } = action;
    
            const newDirName = tags[0].toLowerCase();
    
            let indexDescription = '';
            if (lookUpTag(tags[0])) {
                indexDescription = lookUpTag(tags[0]);
            } else {
                indexDescription = tags[0];
            }
    
            // check if directory exists
            // if not, create it with the _index.md file
            // if yes, add each action path as a new file within the directory
            const newSummary = summary.split('.').join('');
            const newIndexDescription = indexDescription.split('.').join('');
    
            const frontMatter = {
                title: newSummary,
                type: 'api',
                name: operationId,
                operationId,
                menu: {
                    [`api_${apiVersion}`]: {
                        name: newSummary,
                        parent: tags[0]
                    }
                }
            };
        
            const indexFrontMatter = {
                title: newIndexDescription,
                type: 'api',
                name: tags[0],
                menu: {
                    [`api_${apiVersion}`]: {
                        name: tags[0],
                        identifier: tags[0]
                    }
                }
            };
    
            fs.mkdirSync(`./content/en/api/${apiVersion}/${newDirName}`, {
                recursive: true
            });
            const slug = slugify(summary, { lower: true, replacement: '-' });
            const newSlug = slug.split('.').join('');
    
            let yamlStr = yaml.safeDump(frontMatter);
            yamlStr = `---\n${yamlStr}---\n`;
    
            let indexYamlStr = yaml.safeDump(indexFrontMatter);
            indexYamlStr = `---\n${indexYamlStr}---\n`;
    
            fs.writeFileSync(
                `./content/en/api/${apiVersion}/${newDirName}/${newSlug}.md`,
                yamlStr,
                'utf8'
            );
            fs.writeFileSync(
                `./content/en/api/${apiVersion}/${newDirName}/_index.md`,
                indexYamlStr,
                'utf8'
            );
        }
    }
}

buildAPIPages(apiV1FullSpecYaml, "v1")
buildAPIPages(apiV2FullSpecYaml, "v2")