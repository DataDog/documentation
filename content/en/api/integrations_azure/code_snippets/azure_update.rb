require 'rubygems'
require 'dogapi'

api_key = '<DD_API_KEY>'
app_key = '<DD_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
  "tenant_name": "<AZURE_TENANT_NAME>",
  "new_tenant_name": "<NEW_AZURE_TENANT_NAME>",
  "host_filters": "new:filters",
  "client_id": "<AZURE_CLIENT_ID>",
  "new_client_id": "<NEW_AZURE_CLIENT_ID>",
  "client_secret": "<AZURE_CLIENT_SECRET>"
}

dog.azure_integration_update(config)
