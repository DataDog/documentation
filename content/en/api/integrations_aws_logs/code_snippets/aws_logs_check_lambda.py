from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

account_id = "<AWS_ACCOUNT_ID>"
lambda_arn = "arn:aws:lambda:<REGION>:<AWS_ACCOUNT_ID>:function:<FUNCTION_NAME>"

api.AwsLogsIntegration.check_lambda(account_id=account_id, lambda_arn=lambda_arn)