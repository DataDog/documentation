module.exports = {
    production: {
        serverUrl: 'https://docs.datadoghq.com/',
        slackChannel: '#guac-ops'
    },
    preview: {
        serverUrl: 'https://docs-staging.datadoghq.com/',
        slackChannel: '#guac-ops'
    },
    staging: {
        serverUrl: 'https://docs-staging.datadoghq.com/',
        slackChannel: '#guac-ops'
    },
    local: {
        serverUrl: 'http://localhost:1313/',
        slackChannel: '#guac-ops'
    },
    linkCheckOptions: {
        cacheMaxAge: 21_600_000, // 6 hours
        filterLevel: 3,
        maxSockets: 100,
        excludeExternalLinks: false,
        honorRobotExclusions: false,
        brokenLinkSlackLimit: 5,
        excludedKeywords: [
            '**/v1/**',
            '**/v2/**',
            '**/ja/**',
            '**/fr/**',
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
        csvUrl: 'https://origin-static-assets.s3.amazonaws.com/documentation/brokenlinks/'
    }
};
