require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
  "project_id": "<GCP_PROJECT_ID>",
  "client_email": "<CLIENT_EMAIL>",
  "automute": false
}

dog = Dogapi::Client.new(api_key, app_key)

dog.update_integration('gcp', config)
