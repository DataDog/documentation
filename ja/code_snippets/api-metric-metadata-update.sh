api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
metric_name="system.net.bytes_sent"

curl -X PUT -H "Content-type: application/json" \
-d '{
      "type": "gauge",
      "description": "my custom description",
      "short_name": "bytes sent",
      "unit": "byte",
      "per_unit": "second"
    }' \
    "https://app.datadoghq.com/api/v1/metrics/${metric_name}?api_key=${api_key}&application_key=${app_key}"
