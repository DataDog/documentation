#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

currenttime=$(date +%s)
currenttime2=$(date -v -1d +%s)

curl -X GET \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/graph/snapshot?metric_query=system.load.1\{*\}&start=${currenttime2}&end=${currenttime}"
