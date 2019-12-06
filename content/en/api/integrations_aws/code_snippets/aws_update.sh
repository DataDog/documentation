#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# Update an AWS Account in Datadog

curl -X PUT \
-H 'Content-Type: application/json' \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "filter_tags": [
            "<TAG_KEY>:<TAG_VALUE>"
        ],
        "host_tags": [
            "<TAG_KEY>:<TAG_VALUE>"
        ],
        "account_specific_namespace_rules": {
            "auto_scaling": false,
            "opsworks": false
        }
    }' \
"https://api.datadoghq.com/api/v1/integration/aws?account_id=<YOUR_AWS_ACCOUNT_ID>&role_name=<ROLE_NAME>"
