require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
  "account_id": "<AWS_ACCOUNT_ID>",
  "filter_tags": ["<KEY>:<VALUE>"],
  "host_tags": ["<KEY>:<VALUE>"],
  "role_name": "DatadogAWSIntegrationRole",
  "account_specific_namespace_rules": {"auto_scaling": false, "opsworks": false},
  "excluded_regions": ["us-east-1", "us-west-1"]
}

dog.aws_integration_create(config)
