#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X PUT \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/integration/webhooks/configuration/webhooks/<WEBHOOK_NAME>" \
-d '{
    "custom_headers": "{"<WEBHOOK_HEADER_VALUE>":"<WEBHOOK_HEADER_KEY>"}",
    "encode_as": "form"
}'
