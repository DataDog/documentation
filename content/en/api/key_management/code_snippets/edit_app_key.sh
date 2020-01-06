#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X PUT \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "name":"<NEW_APP_KEY_NAME>"
    }' \
"https://app.datadoghq.com/api/v1/application_key/<APP_KEY_TO_EDIT>"
