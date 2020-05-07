module.exports = {
    production: {
        serverUrl: 'https://docs.datadoghq.com/',
        slackChannel: '#link-checker-test'
    },
    preview: {
        serverUrl: 'https://docs-staging.datadoghq.com/zach/update-linkchecker/account_management/billing/',
        slackChannel: '#link-checker-test'
    },
    staging: {
        serverUrl: 'https://docs-staging.datadoghq.com/zach/update-linkchecker/account_management/billing/',
        slackChannel: '#link-checker-test'
    },
    local: {
        serverUrl: 'http://localhost:1313/',
        slackChannel: '#link-checker-test'
    },
    linkCheckOptions: {
        requestMethod: 'GET',
        filterLevel: 3,
        // maxSocketsPerHost: 10,
        maxSockets: 100,
        excludeExternalLinks: false,
        honorRobotExclusions: false,
        brokenLinkSlackLimit: 10,
        // includedKeywords: ['*docs.datadoghq*', '*help.datadoghq*'],
        excludedKeywords: [
            '*ja/blog*',
            // '*ja*',
            '**/fr*',
            '**/ja*',
            '*wtime=*',
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
            '*.txt',
            '*.yaml'
            // '*docs.datadoghq.com/integrations/*'
        ]
    }
};
