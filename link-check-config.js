module.exports = {
    "production": {
        serverUrl: "https://docs.datadoghq.com/",
        branches: ["master"],
    },
    "preview": {
        serverUrl: "https://docs-staging.datadoghq.com/",
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
