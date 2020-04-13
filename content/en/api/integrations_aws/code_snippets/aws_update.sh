#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

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
        },
        "excluded_regions": ["us-east-1", "us-west-1"]
    }' \
"https://api.datadoghq.com/api/v1/integration/aws?account_id=<YOUR_AWS_ACCOUNT_ID>&role_name=<ROLE_NAME>"
