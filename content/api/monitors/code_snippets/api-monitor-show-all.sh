#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -G "https://api.datadoghq.com/api/v1/monitor" \
     -d "api_key=${api_key}" \
     -d "application_key=${app_key}"
