#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

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
        },
        "excluded_regions": ["us-east-1", "us-west-1"]
    }'\
"https://api.datadoghq.com/api/v1/integration/aws"
