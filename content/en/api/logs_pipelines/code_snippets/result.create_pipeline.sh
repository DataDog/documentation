{
    "id": "7fKHTENgSkyGoJcCDbem-g",
    "type": "pipeline",
    "name": "<PIPELINE_NAME>",
    "is_enabled": true,
    "is_read_only": false,
    "filter": {
        "query": "<PIPELINE_QUERY>"
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
