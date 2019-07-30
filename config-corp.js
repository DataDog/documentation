module.exports = {
    "production": {
        branches: ["master", "content-deploy"],
        serverUrl: "https://www.datadoghq.com",
        slackChannel: "#websites",
        google: {
            api_key: "AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw",
            geocode_api_key: "AIzaSyBHOYhxa1lznRERCtnWK3wgDvtZWTzDwy0",
            recaptcha_api: "https://www.google.com/recaptcha/api.js",
            places: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw&libraries=places"
        },
        greenhouse: {
            job_board_url: "https://api.greenhouse.io/v1/boards/datadog/"
        },
        careers_api: {
            application_post: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/application/create",
            presigner: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/presigner"
        },
        algolia_index: "prod-v2"
    },
    "preview": {
        serverUrl: "https://corpsite-preview.datadoghq.com/",
        slackChannel: "#guac-ops",
        google: {
            api_key: "AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw",
            geocode_api_key: "AIzaSyBHOYhxa1lznRERCtnWK3wgDvtZWTzDwy0",
            recaptcha_api: "https://www.google.com/recaptcha/api.js",
            places: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw&libraries=places"
        },
        greenhouse: {
            job_board_url: "https://api.greenhouse.io/v1/boards/datadog/"
        },
        careers_api: {
            application_post: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/application/create",
            presigner: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/presigner"
        },
        algolia_index: "staging"
    },
    "staging": {
        serverUrl: "http://corpsite-staging.datadoghq.com",
        slackChannel: "#guac-ops",
        google: {
            api_key: "AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw",
            geocode_api_key: "AIzaSyBHOYhxa1lznRERCtnWK3wgDvtZWTzDwy0",
            recaptcha_api: "https://www.google.com/recaptcha/api.js",
            places: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw&libraries=places"
        },
        greenhouse: {
            job_board_url: "https://api.greenhouse.io/v1/boards/datadog/"
        },
        careers_api: {
            application_post: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/application/create",
            presigner: "https://7wje6dav9g.execute-api.us-east-1.amazonaws.com/prod/presigner"
        },
        algolia_index: "staging"
    },
    "local": {
        serverUrl: "http://localhost:3000",
        google: {
            api_key: "AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw",
            geocode_api_key: "AIzaSyBHOYhxa1lznRERCtnWK3wgDvtZWTzDwy0",
            recaptcha_api: "https://www.google.com/recaptcha/api.js",
            places: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAV35rQjE2Qg8J6OXtACpCn-b6d3SqepBw&libraries=places"
        },
        greenhouse: {
            job_board_url: "https://api.greenhouse.io/v1/boards/datadog/"
        },
        careers_api: {
            application_post: "http://127.0.0.1:5000/application/create",
            presigner: "http://127.0.0.1:5000/presigner"
        },
        algolia_index: "staging"
    },
    "linkCheckOptions": {
        method: 'get',
        filterLevel: 3,
        maxSocketsPerHost: 75,
        maxSockets: 300,
        excludeExternalLinks: false,
        honorRobotExclusions: false,
        // cacheResponses: true,
        includedKeywords: [
            '*docs.datadoghq*',
            '*help.datadoghq*'
        ],
        excludedKeywords: [
            '**/signup*',
            '*app.datadoghq*',
            '*corp-hugo/tree*',
            '*linkedin.com/share*',
            '*reddit.com/submit*',
            '*twitter.com/share*',
            '*mailto:*',
            '*tel:*',
            '*irc:*',
        ]
    },
    "linkCheckNotifications":{
        keywords:[
            [
                '*datadoghq.com/blog/*',
                '*/about/press/*'
            ],
            [
                {
                    slackChannel: '#guac-ops',
                    message: 'Gobs'
                },
                {
                    slackChannel: '#guac-ops',
                    message: 'Press'
                }
            ]
        ]

    }
}

// '': {
//     slackChannel: '#guac-ops',
//         message: "A blog link is broken tell #writing"
// }
