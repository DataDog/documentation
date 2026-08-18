require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

config = {
  "account_id": '<AWS_ACCOUNT_ID>',
  "role_name": 'DatadogAWSIntegrationRole'
}

dog = Dogapi::Client.new(api_key, app_key)

dog.aws_integration_delete(config)
