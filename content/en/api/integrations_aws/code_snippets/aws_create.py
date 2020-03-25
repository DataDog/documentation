from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.AwsIntegration.create(
    account_id="<AWS_ACCOUNT_ID>",
    host_tags=["tag:example"],
    filter_tags=["filter:example"],
    role_name="<AWS_ROLE_NAME>",
    account_specific_namespace_rules={'namespace1': True/False, 'namespace2': True/False},
    excluded_regions=["us-east-1", "us-west-1"]
)
