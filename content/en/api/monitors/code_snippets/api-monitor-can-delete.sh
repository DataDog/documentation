#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
monitor_id=<YOUR_MONITOR_ID>

# Check if you can delete the monitors
curl -X GET "https://api.datadoghq.com/api/v1/monitor/can_delete?api_key=${api_key}&application_key=${app_key}&monitor_ids=56838,771060,1000376"
