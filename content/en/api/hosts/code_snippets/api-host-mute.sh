api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
      "message": "Muting this host for a test!"
}' "https://api.datadoghq.com/api/v1/host/test.host/mute?api_key=${api_key}&application_key=${app_key}"

