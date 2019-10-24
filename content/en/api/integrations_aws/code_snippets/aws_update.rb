require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

existing_config = {
  "account_id": "<AWS_ACCOUNT_ID>",
  "role_name": 'DatadogAWSIntegrationRole'
}

config = {
  "account_id": '<NEW_AWS_ACCOUNT_ID>',
  "host_tags": ["<KEY>:<VALUE>"],
  "filter_tags": ["<KEY>:<VALUE>"],
  "role_name": '<NEW_AWS_ROLE_NAME>'
}

dog = Dogapi::Client.new(api_key, app_key)

dog.update_aws_account(existing_config, config)