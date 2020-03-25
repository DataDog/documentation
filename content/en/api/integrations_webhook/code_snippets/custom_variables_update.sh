#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X PUT \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/webhooks/configuration/webhooks/<CUSTOM_VARIABLE_NAME>" \
-d '{
    "name": "<NEW_CUSTOM_VARIABLE_NAME>",
    "is_secret": true,
}'
