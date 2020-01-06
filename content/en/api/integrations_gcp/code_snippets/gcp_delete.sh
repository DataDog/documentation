#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X DELETE \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "project_id": "<GCP_PROJECT_ID>",
        "client_email": "<CLIENT_EMAIL>"
    }' \
"https://api.datadoghq.com/api/v1/integration/gcp"
