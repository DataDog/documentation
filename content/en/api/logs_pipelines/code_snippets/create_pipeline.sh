#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "name": "<PIPELINE_NAME>",
    "is_enabled": true,
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
}' \
"https://api.datadoghq.com/api/v1/logs/config/pipelines"
