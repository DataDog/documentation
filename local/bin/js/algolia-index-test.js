const atomicalgolia = require('atomic-algolia')
const indexName = 'docs_test_preview'

const data = [
    {
        objectID: "1",
        title: "An example record"
    }
]

const cb = (error, result) => {
    if (error) throw error

    console.log(result)
}

atomicalgolia(indexName, data, cb)
