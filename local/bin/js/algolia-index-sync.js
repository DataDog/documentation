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
};

const updateSettings = (index) => {
    const settings = {
        searchableAttributes: [
            'unordered(tags)',
            'unordered(content)',
            'unordered(title)',
            'unordered(section_header)'
        ],
        ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
        customRanking: ['desc(rank)'],
        attributesToHighlight: ['title', 'section_header', 'content', 'tags'],
        attributesForFaceting: ['language', 'searchable(tags)'],
        indexLanguages: ['ja', 'en', 'fr'],
        queryLanguages: ['ja', 'en', 'fr'],
        attributeForDistinct: 'full_url',
        distinct: true,
        minWordSizefor1Typo: 3,
        minWordSizefor2Typos: 7,
        ignorePlurals: true,
        optionalWords: ['the', 'without'],
        separatorsToIndex: '_@.#',
        // exactOnSingleWordQuery: 'word'
    };

    return index.setSettings(settings, { forwardToReplicas: true });
};

const updateSynonyms = (index) => {
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
            objectID: 'synthetics',
            type: 'synonym',
            synonyms: ['synthetics', 'synthetic monitoring']
        },
        {
            objectID: 'permissions',
            type: 'synonym',
            synonyms: ['permissions', 'Role Permissions']
        },
        {
            objectID: 'dbm',
            type: 'synonym',
            synonyms: ['dbm', 'database monitoring']
        },
        {
            objectID: 'usm',
            type: 'synonym',
            synonyms: ['usm', 'universal service monitoring']
        },
        {
            objectID: 'npm',
            type: 'synonym',
            synonyms: ['npm', 'network performance monitoring']
        }
    ];

    return index.saveSynonyms(synonyms, {
        forwardToReplicas: true,
        replaceExistingSynonyms: true
    });
};

const updateReplicas = (client, indexName) => {
    const replicas = {};

    replicas[`${indexName}_api`] = {
        ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
        customRanking: ['desc(rank)']
    };

    Object.entries(replicas).forEach(([replicaIndexName, replicaSettings]) => {
        console.log(`Updating replica ${replicaIndexName}..`);
        const index = client.initIndex(replicaIndexName);
        index.setSettings(replicaSettings).then((response) => {
            console.log(`Index ${replicaIndexName} configuration update complete...`);
        });
    });
};

const updateIndex = (indexName) => {
    const localAlogliaSearchIndex = require('../../../public/algolia.json');

    const cb = (error, result) => {
        if (error) {
            console.error(error);
            throw error;
        }

        console.log(result);
    };

    atomicalgolia(indexName, localAlogliaSearchIndex, { verbose: true }, cb);
};

const sync = () => {
    const appId = process.env.ALGOLIA_APP_ID || '';
    const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';
    const indexName = getIndexName();

    if (appId === '' || adminKey === '' || indexName === '') {
        console.error('Missing Algolia App Id, API Key, or Index name.  Exiting...');
        process.exit(1);
    }

    const client = algoliasearch(appId, adminKey);
    const index = client.initIndex(indexName);

    updateSettings(index)
        .then(() => console.log(`${indexName} settings update complete`))
        .catch((err) => console.error(err));

    updateSynonyms(index)
        .then(() => console.log(`${indexName} synonyms update complete`))
        .catch((err) => console.error(err));

    updateReplicas(client, indexName);
    updateIndex(indexName);
};

sync();
