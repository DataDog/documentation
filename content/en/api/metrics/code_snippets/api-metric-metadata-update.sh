api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"

metric_name="system.net.bytes_sent"

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "type": "gauge",
      "description": "my custom description",
      "short_name": "bytes sent",
      "unit": "byte",
      "per_unit": "second"
}' \
"https://api.datadoghq.com/api/v1/metrics/${metric_name}"
