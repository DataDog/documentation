#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X PUT \
  "https://app.datadoghq.com/api/v1/api_key/<API_KEY_TO_EDIT>?api_key=${api_key}&application_key=${app_key}" \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"<NEW_API_KEY_NAME>"
}'
