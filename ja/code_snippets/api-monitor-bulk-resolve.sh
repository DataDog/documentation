#!/bin/sh
# Make sure you replace the API and/or APP key below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

monitor_id= <YOUR_MONITOR_ID>
group_1=<YOUR_FIRST_GROUP>
group_2=<YOUR_FIRST_GROUP>

curl -X POST -H "Content-type: application/json" \
-d '{
"resolve": [
          {"${monitor_id}": "${group_1}"},
          {"${monitor_id}": "${group_2}"}
      ]
    }' \
    "https://app.datadoghq.com/monitor/bulk_resolve?api_key=${api_key}&application_key=${app_key}"
    