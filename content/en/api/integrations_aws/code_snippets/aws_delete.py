from datadog import initialize, api

options = {
    'api_key': '<DD_API_KEY>',
    'app_key': '<DD_APP_KEY>'
}

initialize(**options)

account_id = "<AWS_ACCOUNT_ID>"
role_name = "<AWS_ROLE_NAME>"

api.Aws.delete(account_id=account_id, role_name=role_name)
