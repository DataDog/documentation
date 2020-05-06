module.exports = {
    production: {
        serverUrl: 'https://docs.datadoghq.com/',
        slackChannel: '#link-checker-test'
    },
    preview: {
        serverUrl: 'https://docs-staging.datadoghq.com/',
        slackChannel: '#link-checker-test'
    },
    staging: {
        serverUrl: 'https://docs-staging.datadoghq.com/',
        slackChannel: '#link-checker-test'
    },
    linkCheckOptions: {
        method: 'get',
        filterLevel: 3,
        // maxSocketsPerHost: 30,
        maxSockets: 30,
        requestMethod: 'head',
        excludeExternalLinks: false,
        honorRobotExclusions: false,
        brokenLinkSlackLimit: 10,
        // cacheResponses: true,
        includedKeywords: ['*docs.datadoghq*', '*help.datadoghq*'],
        excludedKeywords: [
            '*ja/blog*',
            '*ja*',
            '*fr*',
            // '*blog*',
            // '*videos*',
            // '*legal*',
            // '*log-management*',
            // '*product*',
            // '*solutions*',
            // '*dashboards*',
            // '*case-studies*',
            // '*ja*',
            // '*resources*',
            // '*jobs-*',
            // '*about*',
            '**/signup*',
            '*app.datadoghq*',
            '*corp-hugo/tree*',
            '*linkedin.com/*',
            '*reddit.com/submit*',
            '*twitter.com/share*',
            '*mailto:*',
            '*tel:*',
            '*irc:*',
            '*googletagmanager*',
            '*munchkin.marketo*',
            '*streaming-corpsite-collector.datadoghq*',
            '*app-sj16.marketo*',
            '*eoig7v0a2o-dsn.algolia*',
            '*.txt'
            // '*docs.datadoghq.com/integrations/*'
        ]
    }
};
