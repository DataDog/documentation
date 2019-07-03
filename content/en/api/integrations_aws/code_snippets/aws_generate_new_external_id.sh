#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT -H "Content-type: application/json"
-d
  '{
    "account_id": "<YOUR_AWS_ACCOUNT_ID>",
    "role_name": "DatadogAWSIntegrationRole"
    }'

"https://dd.datadoghq.com/api/v1/integration/aws/generate_new_external_id?${api_key}&application_key=${app_key}"