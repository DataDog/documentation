
api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

metric_name="system.net.bytes_sent"

curl "https://api.datadoghq.com/api/v1/metrics/${metric_name}?api_key=${api_key}&application_key=${app_key}"

