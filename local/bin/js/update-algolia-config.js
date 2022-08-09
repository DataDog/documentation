const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || '';
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY || '';
let ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || '';

if (process.env.CI_ENVIRONMENT_NAME && !ALGOLIA_INDEX_NAME) {
    const configDocs = require('../../../assets/scripts/config/config-docs');
    switch (process.env.CI_ENVIRONMENT_NAME) {
        case 'live':
            ALGOLIA_INDEX_NAME = configDocs['live'].algoliaConfig.index;
            break;
        case 'preview':
            ALGOLIA_INDEX_NAME = configDocs['preview'].algoliaConfig.index;
            break;
        default:
            ALGOLIA_INDEX_NAME = '';
            break;
    }
}

if (ALGOLIA_APP_ID === '' || ALGOLIA_INDEX_NAME === '' || ALGOLIA_ADMIN_KEY === '') {
    console.log('Missing App Id, Api Key or Index Name');
    process.exit(1);
}

const replicas = {};
replicas[`${ALGOLIA_INDEX_NAME}_API`] = {
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: ['desc(rank)']
};

const settings = {
    searchableAttributes: [
        'title',
        'relpermalink',
        'section_header',
        'type, tags',
        'unordered(description, content)'
    ],
    ranking: ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'],
    customRanking: ['desc(rank)'],
    replicas: Object.keys(replicas),
    attributesToHighlight: ['title', 'section_header', 'description', 'content', 'type', 'tags'],
    indexLanguages: ['ja', 'en', 'fr'],
    queryLanguages: ['ja', 'en', 'fr'],
    attributeForDistinct: 'relpermalink',
    distinct: 1
};

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
];

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
console.log(`Updating primary index configuration on ${ALGOLIA_INDEX_NAME}..`);

const index = client.initIndex(ALGOLIA_INDEX_NAME);

index.setSettings(settings, { forwardToReplicas: true }).then((response) => {
    console.log(`Index ${ALGOLIA_INDEX_NAME} configuration update complete..`);
});

index
    .saveSynonyms(synonyms, {
        forwardToReplicas: true,
        replaceExistingSynonyms: true
    })
    .then(() => {
        console.log(`Index ${ALGOLIA_INDEX_NAME} synonyms update complete..`);
    });

console.log('Updating replicas..');

Object.entries(replicas).forEach(([replicaIndexName, replicaSettings]) => {
    console.log(`Updating replica ${replicaIndexName}..`);
    const index = client.initIndex(replicaIndexName);
    index.setSettings(replicaSettings).then((response) => {
        console.log(`Index ${replicaIndexName} configuration update complete..`);
    });
});
