from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

account_id = "<AWS_ACCOUNT_ID>"
role_name = "<AWS_ROLE_NAME>"

api.AwsIntegration.delete(account_id=account_id, role_name=role_name)
