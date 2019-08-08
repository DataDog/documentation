{
    "id": "<PIPELINE_ID>",
    "type": "pipeline",
    "name": "<PIPELINE_NAME>",
    "is_enabled": false,
    "is_read_only": true,
    "filter": {
        "query": "<PIPELINE_FILTER>"
    },
    "processors": [
        {
            "name": "<PROCESSOR_1_NAME>",
            "is_enabled": true,
            "source": "message",
            "grok": {
                "support_rules": "",
                "match_rules": "<MATCHED_RULES>"
            },
            "type": "grok-parser"
        },
        {
            "name": "Define timestamp as the official timestamp of the log",
            "is_enabled": true,
            "sources": [
                "timestamp"
            ],
            "type": "date-remapper"
        },
        {
            "name": "Define level as the official log status",
            "is_enabled": true,
            "sources": [
                "level"
            ],
            "type": "status-remapper"
        }
    ]
}
