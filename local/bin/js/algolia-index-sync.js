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
            'unordered(title)',
            'unordered(section_header)',
            'unordered(content)'
        ],
        ranking: ['words', 'filters', 'typo', 'attribute', 'proximity', 'exact', 'custom'],
        customRanking: ['desc(rank)'],
        attributesToHighlight: ['title', 'section_header', 'content', 'tags'],
        attributesForFaceting: ['language', 'searchable(tags)'],
        attributesToSnippet: ['content:20'],
        indexLanguages: ['ja', 'en', 'fr', 'ko'],
        queryLanguages: ['ja', 'en', 'fr', 'ko'],
        attributeForDistinct: 'distinct_base_url',
        distinct: true,
        minWordSizefor1Typo: 3,
        minWordSizefor2Typos: 7,
        ignorePlurals: true,
        optionalWords: ['the', 'without'],
        separatorsToIndex: '_@.#',
        advancedSyntax: true
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
            objectID: 'npm',
            type: 'synonym',
            synonyms: ['npm', 'network performance monitoring']
        },
        {
            objectID: 'ksm',
            type: 'synonym',
            synonyms: ['ksm', 'ksm core', 'kubernetes state metrics']
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
        customRanking: ['asc(rank)']
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
    console.info('Syncing local index with Algolia...')
    const fullLocalAlogliaSearchIndex = require('../../../public/algolia.json');
    let localAlgoliaSearchIndex
    let filterLanguage = ''

    // Only the full nightly build re-indexes all language pages in Algolia.
    // Master/preview pipelines will re-index only English pages automatically.
    // This is done to improve performance as Docs continues scaling.
    if (process.env.CI_PIPELINE_SOURCE.toLowerCase() !== 'schedule') {
        localAlgoliaSearchIndex = fullLocalAlogliaSearchIndex.filter(record => record.language === "en")
        filterLanguage = 'en'
    } else {
        localAlgoliaSearchIndex = fullLocalAlogliaSearchIndex
    }

    const cb = (error, result) => {
        if (error) {
            console.error(error);
            throw error;
        }

        console.log(result);
    };

    atomicalgolia(indexName, localAlgoliaSearchIndex, filterLanguage, cb);
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
        .then(() => {
            console.log(`${indexName} settings update complete`);
            updateReplicas(client, indexName);
        })
        .catch((err) => console.error(err));

    updateSynonyms(index)
        .then(() => console.log(`${indexName} synonyms update complete`))
        .catch((err) => console.error(err));

    updateIndex(indexName);
};

sync();
