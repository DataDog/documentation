const { typesenseSync } = require('typesense-sync');
const { saveSettings } = require('typesense-sync/settings');
const config = require('../../../typesense.config.json');

saveSettings()
    .then(() => index())
    .then(() => console.log('Typesense sync completed'))
    .catch(error => console.log('An error occurred', error))

const index = async () => {
    const promises = []

    for (const collection of config.collections) {
        console.log(`Indexing collection ${collection.name}`)
        promises.push(typesenseSync(collection.name, collection.file_path))
    }

    return await Promise.all(promises)
}
