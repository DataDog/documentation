#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "hooks": [
      {
        "name": "<WEBHOOK_NAME>",
        "url": "<WEBHOOK_URL>"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/webhooks"
