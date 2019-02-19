#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
monitor_id=<YOUR_MONITOR_ID>

# Unmute a monitor
curl -X POST "https://api.datadoghq.com/api/v1/monitor/${monitor_id}/unmute?api_key=${api_key}&application_key=${app_key}"
