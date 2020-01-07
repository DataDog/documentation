from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# For account_id/role_name
api.AwsIntegration.update(
    account_id="<EXISTING_AWS_ACCOUNT_ID>",
    role_name="<EXISTING_AWS_ROLE_NAME>",
    new_account_id="<NEW_AWS_ACCOUNT_ID>",
    new_role_name="<NEW_AWS_ROLE_NAME>",
    host_tags=["hosttag:example"],
    filter_tags=["filter:example"],
    account_specific_namespace_rules = {"namespace1":True/False, "namespace2":True/False}
)
