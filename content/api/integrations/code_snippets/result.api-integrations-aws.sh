# List AWS Accounts (role-based only) in Datadog

{"accounts":
    [{
        "account_id": '112233445566',
        "role_name": "SomeDatadogRole",
        "filter_tags": ["filter123"],
        "host_tags": ["account":"demo"],
        "account_specific_namespace_rules": {"opsworks":false}
    }]
}

# Create an AWS Account in Datadog

{'external_id': '123456789'}

# Delete an AWS Account in Datadog

OK