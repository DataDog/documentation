module.exports = {
    "production": {
        serverUrl: "https://docs.datadoghq.com/",
        branches: ["master"],
        slackChannel: "#guac-ops"
    },
    "preview": {
        serverUrl: "https://docs-staging.datadoghq.com/",
        slackChannel: "#guac-ops"
    },
    "staging": {
        serverUrl: "https://docs-staging.datadoghq.com/",
        slackChannel: "#guac-ops"
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
