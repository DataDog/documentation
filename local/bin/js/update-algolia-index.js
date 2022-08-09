const atomicalgolia = require('atomic-algolia')
const localAlogliaSearchIndex = require('../../../public/algolia.json')
const indexName = 'docs_test_preview' // for now

const cb = (error, result) => {
    if (error) {
        console.log(error)
        throw error
    }

    console.log(result)
}

atomicalgolia(indexName, localAlogliaSearchIndex, { verbose: true }, cb)
