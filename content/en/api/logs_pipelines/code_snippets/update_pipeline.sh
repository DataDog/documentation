#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>
pipeline_id=<PIPELINE_ID>

curl -X PUT \
  "https://api.datadoghq.com/api/v1/logs/config/pipelines/${pipeline_id}?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
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
}'
