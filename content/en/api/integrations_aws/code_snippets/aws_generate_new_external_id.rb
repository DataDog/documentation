require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config = {
  "account_id": '<AWS_ACCOUNT_ID>',
  "role_name": 'DatadogAWSIntegrationRole'
}

dog = Dogapi::Client.new(api_key, app_key)

dog.generate_external_id(config)
