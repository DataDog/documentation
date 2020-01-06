#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X PUT -H "Content-type: application/json" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "new_tenant_name": "<NEW_AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>",
        "new_client_id": "<NEW_AZURE_CLIENT_ID>",
        "client_secret": "<AZURE_CLIENT_SECRET>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://api.datadoghq.com/api/v1/integration/azure?api_key=${api_key}&application_key=${app_key}"
