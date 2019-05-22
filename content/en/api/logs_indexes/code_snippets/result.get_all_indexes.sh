{
    "indexes": [
        {
            "name": "index-30d",
            "filter": {
                "query": "status:error"
            },
            "num_retention_days": 30,
            "daily_limit": 150000000,
            "is_rate_limited": false,
            "exclusion_filters": []
        },
        {
            "name": "index-15d",
            "filter": {
                "query": "*"
            },
            "num_retention_days": 15,
            "daily_limit": 200000000,
            "is_rate_limited": false,
            "exclusion_filters": []
        }
    ]
}
