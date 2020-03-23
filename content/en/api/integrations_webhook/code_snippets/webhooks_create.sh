#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X POST \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/webhooks/configuration/webhooks/" \
-d '{
    "name": "<WEBHOOK_NAME>",
    "url": "<WEBHOOK_URL>",
    "payload": null,
    "custom_headers": null
}'
