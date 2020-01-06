#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X PUT \
-H "Content-type: application/json"
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d
  '{
        "account_id": "<YOUR_AWS_ACCOUNT_ID>",
        "role_name": "DatadogAWSIntegrationRole"
    }' \
"https://dd.datadoghq.com/api/v1/integration/aws/generate_new_external_id"
