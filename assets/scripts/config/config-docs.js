module.exports = {
    live: {
        ddClientToken: 'pub16bb5ef3e9bf55f156338987e27246c7',
        ddApplicationId: '3493b4e7-ab12-4852-8836-ba96af7bc745',
        loggingHandler: 'http',
        algoliaConfig: {
            index: 'docs_prod',
            api_index: 'docs_prod_api',
            appId: 'EOIG7V0A2O',
            apiKey: 'c7ec32b3838892b10610af30d06a4e42'
        },
        typesense: {
            host: 'gk6e3zbyuntvc5dap',
            public_key: 'bDUaL3uKrCG0033PDb6Vbi8n46mKGaMG',
            docsIndex: 'docs_alias',
            apiIndex: 'docs_api_alias',
            partnersIndex: 'docs_partners_alias'
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
        typesense: {
            // host: 'dnm1k9zrpctsvjowp',
            // public_key: 'O2QyrgpWb3eKxVCmGVNrORNcSo3pOZJu',
            // TODO: Remove this once Dev Cluster  migration to v30 is complete
            host: 'dsjih73t85kpqe0cp',
            public_key: 'SkRUMwyAJA2FCasO0801KsABcPsmFeNV',
            docsIndex: 'docs_alias',
            apiIndex: 'docs_api_alias',
            partnersIndex: 'docs_partners_alias'
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
        typesense: {
            host: 'dnm1k9zrpctsvjowp',
            public_key: 'O2QyrgpWb3eKxVCmGVNrORNcSo3pOZJu',
            docsIndex: 'docs_alias',
            apiIndex: 'docs_api_alias',
            partnersIndex: 'docs_partners_alias'
        },
        imgUrl: 'http://localhost:1313/',
        gaTag: 'UA-21102638-9'
    }
};
