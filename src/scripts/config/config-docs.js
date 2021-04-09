module.exports = {
    live: {
        ddClientToken: 'puba69fc3e55558f693d58d19e2b21b36c4',
        ddApplicationId: 'b692dec8-2fbe-476c-a57b-84f6bad2422e',
        loggingHandler: 'http',
        algoliaConfig: {
            index: 'docsearch_docs_prod',
            api_index: 'docsearch_docs_prod_api',
            appId: 'EOIG7V0A2O',
            apiKey: 'c7ec32b3838892b10610af30d06a4e42'
        },
        imgUrl: 'https://datadog-docs.imgix.net/',
        gaTag: 'UA-21102638-5'
    },
    preview: {
        ddClientToken: 'puba69fc3e55558f693d58d19e2b21b36c4',
        ddApplicationId: 'b692dec8-2fbe-476c-a57b-84f6bad2422e',
        loggingHandler: 'http',
        algoliaConfig: {
            index: 'docsearch_docs_preview',
            api_index: 'docsearch_docs_preview_api',
            appId: 'EOIG7V0A2O',
            apiKey: 'c7ec32b3838892b10610af30d06a4e42'
        },
        imgUrl: 'https://datadog-docs-staging.imgix.net/',
        gaTag: 'UA-21102638-9'
    },
    development: {
        ddClientToken: 'puba69fc3e55558f693d58d19e2b21b36c4',
        loggingHandler: 'console',
        algoliaConfig: {
            index: 'docsearch_docs_preview',
            api_index: 'docsearch_docs_preview_api',
            appId: 'EOIG7V0A2O',
            apiKey: 'c7ec32b3838892b10610af30d06a4e42'
        },
        imgUrl: 'http://localhost:1313/',
        gaTag: 'UA-21102638-9'
    }
};
