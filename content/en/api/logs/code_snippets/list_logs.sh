#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H 'content-type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "query": "service:nginx -@http.method:POST",
        "time": {
            "from": "now - 1h",
            "to": "now"
        },
        "sort": "desc",
        "limit": 50
    }' \
"https://api.datadoghq.com/api/v1/logs-queries/list"
