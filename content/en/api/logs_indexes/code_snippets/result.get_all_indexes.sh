{
  "indexes": [
      {
        "name": "<INDEX_NAME>",
        "filter": {
            "query": "<INDEX_FILTER_QUERY>"
        },
        "num_retention_days": 15,
        "daily_limit": 150000000,
        "is_rate_limited": false,
        "exclusion_filters": [
            {
                "name": "<INDEX_EXCLUSTION_FILTER_1>",
                "is_enabled": true,
                "filter": {
                    "query": "<INDEX_EXCLUSTION_FILTER_QUERY>",
                    "sample_rate": 1
                }
            }
        ]
    }
  ]
}
