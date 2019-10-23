#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "project_id": "<GCP_PROJECT_ID>",
        "client_email": "<CLIENT_EMAIL>",
        "automute": <AUTOMUTE>
    }' \
"https://api.datadoghq.com/api/v1/integration/gcp"
