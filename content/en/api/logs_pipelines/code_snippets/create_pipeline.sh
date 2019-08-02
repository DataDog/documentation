#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X POST \
  "https://api.datadoghq.com/api/v1/logs/config/pipelines?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
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
}'
