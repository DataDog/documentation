const algoliasearch = require('algoliasearch');
const config = require('../../../src/scripts/config/config-docs');

// console.log(config);

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || '';
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY || '';
// let ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || '';

// console.log(ALGOLIA_APP_ID);
// console.log(ALGOLIA_ADMIN_KEY);
// console.log(ALGOLIA_INDEX_NAME);

const getMappings = () => {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
  const index = client.initIndex('docsearch_docs_preview');
  const browser = index.browseAll();
  let hits = [];

  browser.on('result', content => {
    hits = hits.concat(content.hits);
  });
  
  browser.on('end', () => {
    console.log('Finished!');
    console.log('We got %d hits', hits.length);
  });
  
  browser.on('error', err => {
    throw err;
  });
}

getMappings();

