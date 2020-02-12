#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
         "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/users" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${api_key}" \
         -H "DD-APPLICATION-KEY: ${app_key}" \
         -d '{
             "data": {
                 "type": "users",
                 "id": <USER_ID>
             }
         }'
