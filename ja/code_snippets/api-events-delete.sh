api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
event_id=1377281704830403917

curl -X DELETE "https://api.datadoghq.com/api/v1/events/${event_id}?api_key=${api_key}&application_key=${app_key}"
