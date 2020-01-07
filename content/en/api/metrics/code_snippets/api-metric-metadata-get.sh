
api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

metric_name="system.net.bytes_sent"

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/metrics/${metric_name}"
