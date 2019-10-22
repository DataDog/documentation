from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

account_id = "<AWS_ACCOUNT_ID"
services = ["s3", "elb", "elbv2", "cloudfront", "redshift", "lambda"]

api.AwsLogs.save_services(account_id=account_id, services=services)
