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
        serverUrl: 'https://docs-staging.datadoghq.com/zach/update-linkchecker/account_management/billing/',
        slackChannel: '#link-checker-test'
    },
    local: {
        serverUrl: 'http://localhost:1313/',
        slackChannel: '#link-checker-test'
    },
    linkCheckOptions: {
        filterLevel: 3,
        maxSockets: 100,
        excludeExternalLinks: false,
        honorRobotExclusions: false,
        brokenLinkSlackLimit: 5,
        excludedKeywords: [
            '**/fr*',
            '**/ja*',
            '*wtime=*',
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
        ],
        csvUrl:
            'https://origin-static-assets.s3.amazonaws.com/documentation/brokenlinks/'
    }
};
