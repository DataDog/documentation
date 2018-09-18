#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# List AWS Accounts (role-based only) in Datadog
curl -X GET "https://api.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"

# Create an AWS Account in Datadog
curl -X POST -H "Content-type: application/json" \
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
"https://api.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"

# Delete an AWS Account in Datadog
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "account_id": "<AWS_ACCOUNT_ID>",
        "role_name": "DatadogAWSIntegrationRole"
}' \
"https://api.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"

# List available namespace rules
curl -X GET "https://api.datadoghq.com/api/v1/integration/aws/available_namespace_rules?api_key=${api_key}&application_key=${app_key}" 
