#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# Create an AWS Account in Datadog
curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "filter_tags": ["<KEY>:<VALUE>"],
        "host_tags": ["<KEY>:<VALUE>"],
        "role_name": "DatadogAWSIntegrationRole",
        "account_specific_namespace_rules": {
        	"auto_scaling": false,
        	"opsworks": false
        }
    }'\
"https://api.datadoghq.com/api/v1/integration/aws"
