#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
"resolve": [
          {"<YOUR_MONITOR_ID>": "<YOUR_FIRST_GROUP>"},
          {"<YOUR_MONITOR_ID>": "<YOUR_SECOND_GROUP>"}
      ]
}' \
    "https://app.datadoghq.com/monitor/bulk_resolve?api_key=${api_key}&application_key=${app_key}"
