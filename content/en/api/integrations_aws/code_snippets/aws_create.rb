require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
  "account_id": "<AWS_ACCOUNT_ID>",
  "filter_tags": ["<KEY>:<VALUE>"],
  "host_tags": ["<KEY>:<VALUE>"],
  "role_name": "DatadogAWSIntegrationRole",
  "account_specific_namespace_rules": {"auto_scaling": false, "opsworks": false}
}

dog.create_integration('aws',config)
