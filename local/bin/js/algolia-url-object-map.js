const algoliasearch = require('algoliasearch');
const config = require('../../../src/scripts/config/config-docs');

const getAlgoliaConfig = () => {
  const ciEnvironmentName = process.env.CI_ENVIRONMENT_NAME;
  let algoliaConfig;

  if (ciEnvironmentName) {
    algoliaConfig = ciEnvironmentName === 'live' ? config['live'].algoliaConfig : config['preview'].algoliaConfig;
  } else {
    algoliaConfig = config['development'].algoliaConfig;
  }

  return algoliaConfig;
}

const initializeAlgoliaIndex = () => {
  const { index, appId, apiKey } = getAlgoliaConfig();
  const client = algoliasearch(appId, apiKey);
  return client.initIndex(index);
}

const getAllHits = () => {
  const index = initializeAlgoliaIndex();

  let hits = [];

  index.browseObjects({
    query: '', // Empty query will match all records
    attributesToRetrieve: ["objectID", "url_without_anchor"],
    batch: batch => {
      hits = hits.concat(batch);
    }
  })
  .then(() => console.log(hits.length))
  .catch(e => console.log(e))

  // const allHits = [];
  // let hits = [];

  // console.log(index)

  // index.browse('', {
  //   attributesToRetrieve: ['objectID', 'url_without_anchor'],
  //   hitsPerPage: 1000,
  //   page: 1
  // }).then(data => {
  //   console.log(data)
  // })

  // browseObjects does not exist in v3...
  // index
  // .browseObjects({
  //   batch: (objects) => (hits = hits.concat(objects)),
  // })
  // .then(() => {
  //   console.log('Finished! We got %d hits', hits.length);
  // });

  // index.search('', {
  //   // attributesToRetrieve: ['objectID', 'url_without_anchor'],
  //   hitsPerPage: 1000,
  //   page: 1
  // }).then(data => {
  //   console.log(data)
  // })

  // index.search('', {
  //   // attributesToRetrieve: ['objectID', 'url_without_anchor'],
  //   hitsPerPage: 1000,
  //   page: 2
  // }).then(({ hits }) => {
  //   console.log(hits.length);
  // })
}

// const getAllHits = () => {
//   const index = initializeAlgoliaIndex();
//   const hitsPerPage = 1000; // maximum allowed by Algolia search
//   const allHits = [];
//   let page = 0;

//   const getPaginatedHits = () => {
//     console.log('page number before search = ' + page);

//     return index.search('', {
//       attributesToRetrieve: ['objectID', 'url_without_anchor'],
//       hitsPerPage,
//       page
//     }).then(({ hits }) => {
//       console.log(hits.length)

//       if (hits.length < 1) {
//         console.log('all hits length')
//         console.log(allHits.length);
//         return allHits;
//       }

//       allHits.push(hits);
//       page++;
//       console.log('Page number after increment = ' + page);
//       return getPaginatedHits();
//     })
//   }

//   getPaginatedHits();
// }

getAllHits();





