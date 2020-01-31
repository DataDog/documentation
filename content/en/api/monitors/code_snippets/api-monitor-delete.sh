#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
monitor_id=<YOUR_MONITOR_ID>

# Delete a monitor
curl -X DELETE "https://api.datadoghq.com/api/v1/monitor/${monitor_id}?api_key=${api_key}&application_key=${app_key}"
