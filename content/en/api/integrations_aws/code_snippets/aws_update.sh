#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# Update an AWS Account in Datadog

curl -X PUT \
  "https://api.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}&account_id=<YOUR_AWS_ACCOUNT_ID>&role_name=<ROLE_NAME>" \
  -H 'Content-Type: application/json' \
  -d '{
    "account_id": "<NEW_ACCOUNT_ID>",
    "role_name": "<NEW_ROLE_NAME>",
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
}'
