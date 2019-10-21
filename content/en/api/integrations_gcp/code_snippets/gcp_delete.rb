require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

config = {
    "project_id": "<GCP_PROJECT_ID>",
    "client_email": "<GCP_CLIENT_EMAIL>"
  }

dog.delete_gcp_integration(config)
