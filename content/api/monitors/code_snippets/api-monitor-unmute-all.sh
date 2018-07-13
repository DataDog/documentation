api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" "https://api.datadoghq.com/api/v1/monitor/unmute_all?api_key=${api_key}&application_key=${app_key}"

