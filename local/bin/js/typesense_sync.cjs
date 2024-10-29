const { typesenseSync } = require('typesense-sync');
const { saveSettings } = require('typesense-sync/settings');
const config = require('../../../typesense.config.json');
const fs = require('fs')

saveSettings()
    .then(() => index())
    .then(() => console.log('Typesense sync completed'))
    .catch(error => console.log('An error occurred', error))

const index = async () => {
    const promises = []

    // if !== scheduled in gitlab...
    if (true) {
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

            // If we add more collections this will have to change
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
