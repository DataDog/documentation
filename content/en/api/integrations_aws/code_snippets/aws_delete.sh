#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# Delete an AWS Account in Datadog
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "role_name": "DatadogAWSIntegrationRole"
}' \
"https://api.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"