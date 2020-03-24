#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
monitor_id=<YOUR_MONITOR_ID>

# Show a monitor
curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/monitor/${monitor_id}?group_states=all"
