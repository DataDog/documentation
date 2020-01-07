#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X DELETE \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>"
    }' \
"https://api.datadoghq.com/api/v1/integration/azure"
