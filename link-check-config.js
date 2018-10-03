module.exports = {
    "production": {
        branches: ["master"],
    },
    "preview": {
        serverUrl: "http://docs-staging.datadoghq.com/",
    },
    "linkCheckOptions": {
        filterLevel: 3,
        maxSocketsPerHost: 90,
        maxSockets: 250,
        excludeExternalLinks: true,
        honorRobotExclusions: false,
        cacheResponses: true,
        includedKeywords: [
            '*imgix*'
        ],
        excludedKeywords: [
            '**/signup*'
        ]

    }
};
