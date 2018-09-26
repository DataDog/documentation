module.exports = {
    "production": {
        branches: ["master"],
    },
    "preview": {
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
