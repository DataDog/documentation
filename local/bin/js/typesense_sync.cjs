const { typesenseSync } = require('typesense-sync');
const { saveSettings } = require('typesense-sync/settings');
const config = require('../../../typesense.config.json');
const fs = require('fs')
const TYPESENSE_CONFIG_UPDATED = process.env.TYPESENSE_CONFIG_UPDATED || false;

const indexSite = async () => {
    const promises = []

    // nightly build pipeline syncs all records in Typesense, all others index english records only.
    // this is a performance improvement as docs scales.
    if (process.env.CI_PIPELINE_SOURCE.toLowerCase() !== 'schedule') {
        const fullSearchIndex = require('../../../public/search.json')
        const destFilePath = './public/english_search.json'
        const docsAlias = 'docs_alias'
        const filterLanguage = 'en'
        const englishOnlySearchIndex = fullSearchIndex.filter(record => record.language === "en")

        fs.writeFile(destFilePath, JSON.stringify(englishOnlySearchIndex), (err) => {
            if (err) {
                console.error(err)
                return
            }

            // If we add more collections this will have to change to be iterative
            promises.push(typesenseSync(docsAlias, destFilePath, filterLanguage))
        })
    } else {
        for (const collection of config.collections) {
            console.log(`Indexing collection ${collection.name}`)
            promises.push(typesenseSync(collection.name, collection.file_path))
        }
    }

    return await Promise.all(promises)
}

if (TYPESENSE_CONFIG_UPDATED) {
    saveSettings()
        .then(() => indexSite())
        .then(() => console.log('Typesense sync completed'))
        .catch(error => console.log('An error occurred', error))
} else {
    console.log('typesense.config.json unchanged, skipping settings update.')
    indexSite()
        .then(() => console.log('Typesense sync completed'))
        .catch(error => console.log('An error occurred', error))
}
