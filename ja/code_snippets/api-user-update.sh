api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
user=test@datadoghq.com

curl -X PUT -H "Content-type: application/json" \
    -d '{"email":"test+1@datadoghq.com","name":"alt user", "access_role":"ro"}' \
    "https://api.datadoghq.com/api/v1/user/${user}?api_key=${api_key}&application_key=${app_key}"
