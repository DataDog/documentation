#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X DELETE \
        "https://app.datadoghq.com/api/v2/roles/<ROLE_ID>/permissions" \
         -H "Content-Type: application/json" \
         -H "DD-API-KEY: ${api_key}" \
         -H "DD-APPLICATION-KEY: ${app_key}" \
         -d '{
             "data":
             {
                 "type": "permissions",
                 "id": <PERMISSION_ID>
             }
         }'
