#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

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
