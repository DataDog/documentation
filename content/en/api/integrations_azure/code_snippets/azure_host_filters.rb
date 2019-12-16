require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
    "tenant_name": "<AZURE_TENANT_NAME>",
    "client_id": "<AZURE_CLIENT_ID>",
    "host_filters": "<NEW_KEY>:<NEW_VALUE>"
  }

dog = Dogapi::Client.new(api_key, app_key)

dog.azure_integration_update_host_filters(config)
