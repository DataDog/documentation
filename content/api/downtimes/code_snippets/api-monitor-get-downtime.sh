api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

downtime_id=2473

curl "https://api.datadoghq.com/api/v1/downtime/${downtime_id}?api_key=${api_key}&application_key=${app_key}"