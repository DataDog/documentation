#!/bin/sh
# Make sure you replace the API and/or APP key below
# with the ones for your account

api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

monitor_id= <YOUR_MONITOR_ID>
group_1=<YOUR_FIRST_GROUP>
group_2=<YOUR_FIRST_GROUP>

curl -X POST -H "Content-type: application/json" \
-d '{
"resolve": [
          {"${monitor_id}": "${group_1}"},
          {"${monitor_id}": "${group_2}"},
      ]
    }' \
    "https://app.datadoghq.com/monitor/bulk_resolve?api_key=${api_key}&application_key=${app_key}"