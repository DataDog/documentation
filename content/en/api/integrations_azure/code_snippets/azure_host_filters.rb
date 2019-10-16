require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
    "tenant_name": "<AZURE_TENANT_NAME>",
    "client_id": "<AZURE_CLIENT_ID>",
    "client_secret": "<AZURE_CLIENT_SECRET>",
    "host_filters": "<NEW_KEY>:<NEW_VALUE>"
  }

dog = Dogapi::Client.new(api_key, app_key)

dog.create_integration('azure', config)
