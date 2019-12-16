require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
  "project_id": "<GCP_PROJECT_ID>",
  "client_email": "<GCP_CLIENT_EMAIL>",
  "automute": true,
  "host_filters": "<NEW>:<FILTERS>"
}

dog = Dogapi::Client.new(api_key, app_key)

dog.gcp_integration_update(config)
