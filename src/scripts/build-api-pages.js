#!/usr/bin/env node

const yaml = require('js-yaml');
const fs = require('fs');
const slugify = require('slugify');

const apiV1FullSpecYaml = yaml.safeLoad(
    fs.readFileSync('./data/api/v1/full_spec.yaml', 'utf8')
);

const apiV2FullSpecYaml = yaml.safeLoad(
    fs.readFileSync('./data/api/v2/full_spec.yaml', 'utf8')
);

function updateApiSideNav(apiYaml, apiVersion) {
    const menuYaml = yaml.safeLoad(
        fs.readFileSync('./config/_default/menus/menus.en.yaml', 'utf8')
    );

    const newMenuArray = [];

    for (let i = 0; i < apiYaml.tags.length; i += 1) {
        const tags = apiYaml.tags[i];

        const newDirName = slugify(tags.name, {
            lower: true,
            replacement: '-'
        });

        const indexFrontMatter = {
            title: tags.name,
            type: 'api'
        };

        fs.mkdirSync(`./content/en/api/${apiVersion}/${newDirName}`, {
            recursive: true
        });

        let indexYamlStr = yaml.safeDump(indexFrontMatter);
        indexYamlStr = `---\n${indexYamlStr}---\n`;

        try {
            fs.writeFileSync(
                `./content/en/api/${apiVersion}/${newDirName}/_index.md`,
                indexYamlStr,
                'utf8'
            );
            console.log(
                `successfully wrote ./content/en/api/${apiVersion}/${newDirName}/_index.md`
            );
        } catch (err) {
            throw err;
        }

        const indexMenuObject = {
            name: tags.name,
            url: `/api/${apiVersion}/${slugify(tags.name, {
                lower: true,
                replacement: '-'
            })}/`,
            identifier: tags.name
        };

        newMenuArray.push(indexMenuObject);

        for (const [path, actions] of Object.entries(apiYaml.paths)) {
            for (const [key, action] of Object.entries(actions)) {
                if (tags.name === action.tags[0]) {
                    const childMenuObject = {
                        name: action.summary,
                        parent: tags.name,
                        url: slugify(action.summary, {
                            lower: true,
                            replacement: '-'
                        })
                    };

                    newMenuArray.push(childMenuObject);
                }
            }
        }
    }

    menuYaml[`api_${apiVersion}`] = newMenuArray;

    const newMenuYaml = yaml.dump(menuYaml, {
        lineWidth: -1
    });

    try {
        fs.writeFileSync(
            './config/_default/menus/menus.en.yaml',
            newMenuYaml,
            'utf8'
        );
        console.log(
            'successfully updated ./config/_default/menus/menus.en.yaml'
        );
    } catch (err) {
        throw err;
    }
}

updateApiSideNav(apiV1FullSpecYaml, 'v1');
updateApiSideNav(apiV2FullSpecYaml, 'v2');
