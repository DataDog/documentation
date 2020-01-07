#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
pipeline_id=<PIPELINE_ID>

curl -X PUT \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "name": "<NEW_PIPELINE_NAME>",
    "is_enabled": true,
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
}' \
"https://api.datadoghq.com/api/v1/logs/config/pipelines/${pipeline_id}"
