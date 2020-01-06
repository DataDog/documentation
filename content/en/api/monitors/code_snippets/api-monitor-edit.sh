#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
monitor_id=<YOUR_MONITOR_ID>

# Edit a monitor
curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "query": "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100",
      "name": "Bytes received on host0",
      "message": "We may need to add web hosts if this is consistently high."
}' \
"https://api.datadoghq.com/api/v1/monitor/${monitor_id}"
