api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

metric_name="system.net.bytes_sent"

curl -X PUT -H "Content-type: application/json" \
-d '{
      "type": "gauge",
      "description": "my custom description",
      "short_name": "bytes sent",
      "unit": "byte",
      "per_unit": "second"
}' \
    "https://api.datadoghq.com/api/v1/metrics/${metric_name}?api_key=${api_key}&application_key=${app_key}"

