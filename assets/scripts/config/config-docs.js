module.exports = {
    live: {
        ddClientToken: 'pub16bb5ef3e9bf55f156338987e27246c7',
        ddApplicationId: '3493b4e7-ab12-4852-8836-ba96af7bc745',
        loggingHandler: 'http',
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
        typesense: {
            host: 'dnm1k9zrpctsvjowp',
            public_key: 'O2QyrgpWb3eKxVCmGVNrORNcSo3pOZJu',
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
