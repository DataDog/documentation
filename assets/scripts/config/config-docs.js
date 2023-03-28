module.exports = {
    live: {
        ddClientToken: 'pub16bb5ef3e9bf55f156338987e27246c7',
        ddApplicationId: '3493b4e7-ab12-4852-8836-ba96af7bc745',
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
        ddClientToken: 'pub16bb5ef3e9bf55f156338987e27246c7',
        ddApplicationId: '3493b4e7-ab12-4852-8836-ba96af7bc745',
        loggingHandler: 'http',
        algoliaConfig: {
            index: 'docs_preview',
            api_index: 'docs_preview_api',
            appId: 'K8XL4ROVCR',
            apiKey: 'c00312a19630387f86998847cca3b65c'
        },
        imgUrl: 'https://datadog-docs-staging.imgix.net/',
        gaTag: 'UA-21102638-9'
    },
    development: {
        ddClientToken: 'pub36877d3864fab670b5ae7e1d5d26cb0',
        loggingHandler: 'console',
        algoliaConfig: {
            index: 'docs_preview',
            api_index: 'docs_preview_api',
            appId: 'K8XL4ROVCR',
            apiKey: 'c00312a19630387f86998847cca3b65c'
        },
        imgUrl: 'http://localhost:1313/',
        gaTag: 'UA-21102638-9'
    }
};
