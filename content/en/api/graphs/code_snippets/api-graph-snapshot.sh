#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

end_date=$(date +%s)
start_date=$(($end_date - 86400))

curl -X GET \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/graph/snapshot?metric_query=system.load.1\{*\}&start=${start_date}&end=${end_date}"
