api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "message": "Muting this host for a test!"
}' \
"https://api.datadoghq.com/api/v1/host/test.host/mute"

