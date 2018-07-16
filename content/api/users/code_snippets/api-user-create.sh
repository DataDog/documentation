api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X POST -H "Content-type: application/json" \
    -d '{"handle":"test@datadoghq.com","name":"test user", "access_role":"st"}' \
    "https://api.datadoghq.com/api/v1/user?api_key=${api_key}&application_key=${app_key}"

