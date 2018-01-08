# List AWS Accounts (role-based only) in Datadog
curl -X GET "https://app.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"



# Create an AWS Account in Datadog
curl -X POST -H "Content-type: application/json" \
-d '{
        "account_id": "YOUR_AWS_ACCOUNT_ID",
        "filter_tags": ["env:staging"],
        "host_tags": ["account:staging","account:customer1"],
        "role_name": "DatadogAWSIntegrationRole"
    }' \
"https://app.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"




# Delete an AWS Account in Datadog
curl -X DELETE -H "Content-type: application/json" \
-d '{
        "account_id": "YOUR_AWS_ACCOUNT_ID",
        "role_name": "DatadogAWSIntegrationRole"
    }' \
"https://app.datadoghq.com/api/v1/integration/aws?api_key=${api_key}&application_key=${app_key}"