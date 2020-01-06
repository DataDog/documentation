#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

# Create an Azure account in Datadog
curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>",
        "client_secret": "<AZURE_CLIENT_SECRET>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://api.datadoghq.com/api/v1/integration/azure"
