api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
monitor_id=91879

# Create a monitor to show
monitor_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
      "type": "metric alert",
      "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} > 100",
      "name": "Bytes received on host0",
      "message": "We may need to add web hosts if this is consistently high."
    }' \
    "https://api.datadoghq.com/api/v1/monitor?api_key=${api_key}&application_key=${app_key}" | jq '.id')

curl -G "https://api.datadoghq.com/api/v1/monitor/${monitor_id}" \
     -d "api_key=${api_key}" \
     -d "application_key=${app_key}" \
     -d "group_states=all"
