#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
monitor_id=<YOUR_MONITOR_ID>

# Mute a monitor
curl -X POST -H "Content-type: application/json" "https://api.datadoghq.com/api/v1/monitor/${monitor_id}/mute?api_key=${api_key}&application_key=${app_key}"
