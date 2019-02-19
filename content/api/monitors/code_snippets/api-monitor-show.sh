#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
monitor_id=<YOUR_MONITOR_ID>

# Show a monitor
curl -G "https://api.datadoghq.com/api/v1/monitor/${monitor_id}" \
     -d "api_key=${api_key}" \
     -d "application_key=${app_key}" \
     -d "group_states=all"
