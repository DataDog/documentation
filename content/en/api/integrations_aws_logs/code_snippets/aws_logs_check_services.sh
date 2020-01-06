#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST -H "Content-type: application/json" \
-d '{
        "account_id": "AWS_ACCOUNT_ID",
        "services": ["s3", "elb", "elbv2", "cloudfront", "redshift", "lambda"]
    }' \
"https://api.datadoghq.com/api/v1/integration/aws/logs/services_async?api_key=${api_key}&application_key=${app_key}"
