#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X DELETE \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>"
    }' \
"https://api.datadoghq.com/api/v1/integration/azure"
