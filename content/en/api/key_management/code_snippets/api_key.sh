#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

# Get all your current API keys
curl -X GET \
  "https://app.datadoghq.com/api/v1/api_key?api_key=${api_key}}&application_key=${app_key}" \
  -H 'Content-Type: application/json'

# Create a new API key

curl -X POST \
  "https://app.datadoghq.com/api/v1/api_key?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
  -d '{
	"name": "<API_KEY_NAME>"
}'

# Get a given API KEY name

curl -X GET \
  "https://app.datadoghq.com/api/v1/api_key/<API_KEY_TO_GET>?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json'

# Edit a given API KEY name

curl -X PUT \
  "https://app.datadoghq.com/api/v1/api_key/<API_KEY_TO_EDIT>?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"<NEW_API_KEY_NAME>"
}'

# Delete a given API key

curl -X DELETE \
  "https://app.datadoghq.com/api/v1/api_key/<API_KEY_TO_DELETE>?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json'
