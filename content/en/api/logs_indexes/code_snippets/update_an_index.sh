#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT \
-H 'content-type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "filter": {
        "query": "<NEW_INDEX_FILTER_QUERY>"
    },
    "exclusion_filters": [
      {
        "name": "<INDEX_EXCLUSTION_FILTER_1>",
        "is_enabled": true,
        "filter": {
          "query": "<INDEX_EXCLUSTION_FILTER_QUERY>",
          "sample_rate": 1
        }
      },
      {
        "name": "<INDEX_EXCLUSTION_FILTER_2>",
        "is_enabled": true,
        "filter": {
          "query": "<INDEX_EXCLUSTION_FILTER_QUERY_2>",
          "sample_rate": 1
        }
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/logs/config/indexes/<INDEX_NAME>"
