#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X POST \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-H "Content-type: application/json" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "services": ["elb","s3"]
    }'\
"https://api.datadoghq.com/api/v1/integration/aws/logs/services"
