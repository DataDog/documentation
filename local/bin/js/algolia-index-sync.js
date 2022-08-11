const algoliasearch = require('algoliasearch');
const atomicalgolia = require('atomic-algolia');

const getIndexName = () => {
    let algoliaIndexName = process.env.ALGOLIA_INDEX_NAME || '';
    const configDocs = require('../../../assets/scripts/config/config-docs');

    switch (process.env.CI_ENVIRONMENT_NAME) {
        case 'live':
            algoliaIndexName = configDocs['live'].algoliaConfig.index;
            break;
        case 'preview':
            algoliaIndexName = configDocs['preview'].algoliaConfig.index;
            break;
        default:
            algoliaIndexName = '';
            break;
    }

    return algoliaIndexName;
}

const updateSettings = index => {
    const settings = {
        searchableAttributes: ['title', 'relpermalink', 'section_header', 'type, tags', 'unordered(description, content)'],
        ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
        customRanking: ['desc(rank)'],
        // replicas: Object.keys(replicas),
        attributesToHighlight: ['title', 'section_header', 'description', 'content', 'type', 'tags'],
        indexLanguages: ['ja', 'en', 'fr'],
        queryLanguages: ['ja', 'en', 'fr'],
        attributeForDistinct: 'relpermalink',
        distinct: 1
    }

    return index.setSettings(settings, { forwardToReplicas: true })
}

const updateSynonyms = index => {
    const synonyms = [
        {
            objectID: 'agent',
            type: 'synonym',
            synonyms: ['agent', 'datadog agent']
        },
        {
            objectID: 'azure',
            type: 'synonym',
            synonyms: ['microsoft azure', 'azure']
        },
        {
            objectID: 'gcp',
            type: 'synonym',
            synonyms: ['gcp', 'google cloud platform']
        },
        {
            objectID: 'aws',
            type: 'synonym',
            synonyms: ['aws', 'amazon web service']
        },
        {
            objectID: 'rum',
            type: 'synonym',
            synonyms: ['RUM', 'rum', 'real user monitoring']
        },
        {
            objectID: 'permissions',
            type: 'synonym',
            synonyms: ['permissions', 'Role Permissions']
        }
    ]

    return index.saveSynonyms(synonyms, {
        forwardToReplicas: true,
        replaceExistingSynonyms: true
    })
}

const updateRules = index => {
    // const rule = {
    //     objectID: 'a-rule-id',
    //     conditions: [
    //         {
    //             pattern: 'search query',
    //             anchoring: 'one of: is, contains, starts with, or ends with'
    //         }
    //     ],
    //     consequence: {
    //         params: {
    //             filters: 'relevant filter here'
    //         },
    //         promote: {},
    //         hide: {}
    //     },
    //     enabled: false
    // }

    // how do we deal with figuring out objectIDs
    // for promoting hits?
    const rule = {
        objectID: 'azure',
        conditions: [{
            pattern: 'azure',
            anchoring: 'is'
        }],
        consequence: {
            promote: [{
                objectID: '61bd3abb1485b1e2df64e5b7b56d6281',
                position: 0
            }]
        }
    }

    // do we want to forward to replicas here?
    return index.saveRule(rule)
}

const updateReplicas = (client, indexName) => {
    const replicas = {};
    
    replicas[`${indexName}_api`] = {
        ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
        customRanking: ['desc(rank)']
    };

    Object.entries(replicas).forEach(([replicaIndexName, replicaSettings]) => {
        console.log(`Updating replica ${replicaIndexName}..`);
        const index = client.initIndex(replicaIndexName);
        index.setSettings(replicaSettings).then((response) => {
            console.log(`Index ${replicaIndexName} configuration update complete...`);
        });
    });
}

const updateIndex = indexName => {
    const localAlogliaSearchIndex = require('../../../public/algolia.json');

    const cb = (error, result) => {
        if (error) {
            console.error(error)
            throw error
        }

        console.log(result)
    }

    atomicalgolia(indexName, localAlogliaSearchIndex, { verbose: true }, cb)
}

const sync = () => {
    const appId = process.env.ALGOLIA_APP_ID || '';
    const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';
    const indexName = getIndexName();

    if (appId === '' || adminKey === '' || indexName === '') {
        console.error('Missing Algolia App Id, API Key, or Index name.  Exiting...')
        process.exit(1);
    }

    const client = algoliasearch(appId, adminKey);
    const index = client.initIndex(indexName);

    updateSettings(index)
        .then(() => console.log(`${indexName} settings update complete`))
        .catch(err => console.error(err))

    updateSynonyms(index)
        .then(() => console.log(`${indexName} synonyms update complete`))
        .catch(err => console.error(err))

    updateRules(index)
        .then(() => console.log(`${indexName} rules update complete`))
        .catch(err => console.error(err))

    updateReplicas(client, indexName);
    updateIndex(indexName);
}

sync();