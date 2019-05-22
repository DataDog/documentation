{
    "name": "index-30d",
    "filter": {
        "query": ""
    },
    "num_retention_days": 30,
    "daily_limit": 200000000,
    "is_rate_limited": false,
    "exclusion_filters": [
        {
            "name": "nginx",
            "is_enabled": true,
            "filter": {
                "query": "source:nginx",
                "sample_rate": 0.99
            }
        },
        {
            "name": "redis",
            "is_enabled": true,
            "filter": {
                "query": "source:redis",
                "sample_rate": 0.8
            }
        }
    ]
}
