/* eslint-disable */
const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || '';
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY || '';
let ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || '';

// If this is a gitlab run and we don't have an index name already defined lets pull
// from the config so we can define in one place
if (process.env.CI_ENVIRONMENT_NAME && !ALGOLIA_INDEX_NAME) {
    const configCorp = require('../../../src/scripts/config/config-docs');
    switch (process.env.CI_ENVIRONMENT_NAME) {
        case 'live':
            ALGOLIA_INDEX_NAME = configCorp['live'].algoliaConfig.index;
            break;
        case 'preview':
            ALGOLIA_INDEX_NAME = configCorp['preview'].algoliaConfig.index;
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
replicas[`${ALGOLIA_INDEX_NAME}_api`] = {
    attributesToIndex: [
      "unordered(hierarchy_radio_camel.lvl0)",
      "unordered(hierarchy_radio.lvl0)",
      "unordered(hierarchy_radio_camel.lvl1)",
      "unordered(hierarchy_radio.lvl1)",
      "unordered(hierarchy_radio_camel.lvl2)",
      "unordered(hierarchy_radio.lvl2)",
      "unordered(hierarchy_radio_camel.lvl3)",
      "unordered(hierarchy_radio.lvl3)",
      "unordered(hierarchy_radio_camel.lvl4)",
      "unordered(hierarchy_radio.lvl4)",
      "unordered(hierarchy_camel.lvl0)",
      "unordered(hierarchy.lvl0)",
      "unordered(hierarchy_camel.lvl1)",
      "unordered(hierarchy.lvl1)",
      "unordered(hierarchy_camel.lvl2)",
      "unordered(hierarchy.lvl2)",
      "unordered(hierarchy_camel.lvl3)",
      "unordered(hierarchy.lvl3)",
      "unordered(hierarchy_camel.lvl4)",
      "unordered(hierarchy.lvl4)",
      "content",
      "unordered(tags)"
    ],
    attributesToRetrieve: [
      "anchor",
      "content",
      "hierarchy",
      "tags",
      "url"
    ],
    attributesForFaceting: [
      "language",
      "searchable(tags)"
    ],
    customRanking: [
      "asc(tags)",
      "desc(weight.page_rank)",
      "desc(weight.level)",
      "asc(weight.position)"
    ]
};

const settings = { replicas: Object.keys(replicas) };

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
console.log(`Updating primary index configuration on ${ALGOLIA_INDEX_NAME}..`);
const index = client.initIndex(ALGOLIA_INDEX_NAME);
index.setSettings(settings, { forwardToReplicas: true }).then((response) => {
    console.log(`Index ${ALGOLIA_INDEX_NAME} configuration update complete..`);
});

/*
  First time replica creation will likely needs a second run of this script as it’s impossible
  to forward settings and create your replicas at the same time.
  https://www.algolia.com/doc/api-reference/api-methods/set-settings/#method-param-forwardtoreplicas
*/
console.log('Updating replicas..');
Object.entries(replicas).forEach(([replicaIndexName, replicaSettings]) => {
    console.log(`Updating replica ${replicaIndexName}..`);
    const index = client.initIndex(replicaIndexName);
    index.setSettings(replicaSettings).then((response) => {
        console.log(`Index ${replicaIndexName} configuration update complete..`);
    });
});
