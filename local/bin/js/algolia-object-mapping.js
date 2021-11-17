const algoliasearch = require('algoliasearch');
// import { getConfig } from '../../../src/scripts/helpers/helpers';
// import { getAlogliaIndexName } from '../../../src/scripts/algolia-insights';

const getAlgoliaSearchEntries = () => {
  // const { algoliaConfig } = getConfig();
  // const { appId, apiKey } = algoliaConfig;
  const client = algoliasearch('EOIG7V0A2O', 'c7ec32b3838892b10610af30d06a4e42');
  const index = client.initIndex('docsearch_docs_preview');
  let hits = [];
  
  index.browseObjects({
    query: '',
    attributesToRetrieve: ['url', 'url_without_anchor'],
    batch: batch => {
      hits = hits.concat(batch);
    }
  }).then(() => console.log(hits.length));

  // return index.search('*', {
  //   hitsPerPage: 5,
  //   attributesToRetrieve: ['url', 'url_without_anchor'],
  //   restrictSearchableAttributes: ['url']
  // })
  // .then(({ hits }) => {
  //   hits.forEach(hit => {
  //     fullIndexResults.push(hit);
  //   })

  //   console.log(fullIndexResults)
  // })
}

getAlgoliaSearchEntries();

