const algoliasearch = require('algoliasearch');
const fs = require('fs');
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
  const { index, appId, browseApiKey } = getAlgoliaConfig();
  const client = algoliasearch(appId, browseApiKey);
  return client.initIndex(index);
}

const createDataFile = (algoliaRecordsArray) => {
  const filePath = 'data/algolia_objects.json';
  console.log(`Algolia records array length is ${algoliaRecordsArray.length} when provided to function to write data.`)

  fs.writeFile(filePath, algoliaRecordsArray, (err) => {
    if (err) {
      console.error(err)
    }

    console.info('Algolia objects data file saved.');
  })

  fs.readFile(filePath, (err, data) => {
    console.log(`Aloglia records array length is ${data.length} after writing to the file.`);
  })
}

const getAllRecords = () => {
  const index = initializeAlgoliaIndex();
  const allRecords = [];

  index.browseObjects({
    query: '', // Empty query matches all records.
    attributesToRetrieve: ['objectID', 'url'],
    facetFilters: ['language:en'],
    batch: batch => {
      for (const record of batch) {
        const { url } = record;

        if (!url.includes('#')) {
          allRecords.push(record)
        }
      }
    }
  })
  .then(() => createDataFile(JSON.stringify(allRecords)))
  .catch(e => console.error(e))
}

getAllRecords();





