#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# List Azure accounts in Datadog
curl -X GET "https://app.datadoghq.com/api/v1/integration/azure?api_key=${api_key}&application_key=${app_key}"

# Create an Azure account in Datadog
curl -X POST -H "Content-type: application/json" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>",
        "client_secret": "<AZURE_CLIENT_SECRET>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://app.datadoghq.com/api/v1/integration/azure?api_key=${api_key}&application_key=${app_key}"

# Update an Azure account's host filters in Datadog
# tenant_name and client_id are required
curl -X POST -H "Content-type: application/json" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>",
        "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
    }' \
"https://app.datadoghq.com/api/v1/integration/azure/host_filters?api_key=${api_key}&application_key=${app_key}"

# Delete an Azure account in Datadog
# tenant_name and client_id are required
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "tenant_name": "<AZURE_TENANT_NAME>",
        "client_id": "<AZURE_CLIENT_ID>"
    }' \
"https://app.datadoghq.com/api/v1/integration/azure?api_key=${api_key}&application_key=${app_key}"
