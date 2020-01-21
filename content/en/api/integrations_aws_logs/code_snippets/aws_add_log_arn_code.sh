#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "lambda_arn": "arn:aws:lambda:us-east-1:123456789012:function:PushLogs"
    }'\
"https://api.datadoghq.com/api/v1/integration/aws/logs"
