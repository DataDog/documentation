require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
    "tenant_name": '<AZURE_TENANT_NAME>',
    "client_id": '<AZURE_CLIENT_ID>'
  }

dog.azure_integration_delete(config)
