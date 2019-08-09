{
    "id": "<PIPELINE_ID>",
    "type": "pipeline",
    "name": "<NEW_PIPELINE_NAME>",
    "is_enabled": true,
    "is_read_only": false,
    "filter": {
        "query": "<NEW_PIPELINE_QUERY>"
    },
    "processors": [
        {
            "name": "Define date as the official timestamp of the log",
            "is_enabled": true,
            "sources": [
                "date"
            ],
            "type": "date-remapper"
        }
    ]
}
