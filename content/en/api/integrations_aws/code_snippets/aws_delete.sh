#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

# Delete an AWS Account in Datadog
curl -X DELETE \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "role_name": "DatadogAWSIntegrationRole"
}' \
"https://api.datadoghq.com/api/v1/integration/aws"
