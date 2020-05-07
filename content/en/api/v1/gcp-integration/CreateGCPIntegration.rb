require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

config= {
    "type": "service_account",
    "project_id": "<GCP_PROJECT_ID>",
    "private_key_id": "<PRIVATE_KEY_ID>",
    "private_key": "<PRIVATE_KEY>",
    "client_email": "<CLIENT_EMAIL>",
    "client_id": "<CLIENT_ID>",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<CLIENT_EMAIL>",
    "host_filters": "<KEY_1>:<VALUE_1>,<KEY_2>:<VALUE_2>"
  }

dog = Dogapi::Client.new(api_key, app_key)

dog.gcp_integration_create(config)
