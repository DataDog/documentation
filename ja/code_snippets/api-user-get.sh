api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
user=test@datadoghq.com

curl -X GET "https://api.datadoghq.com/api/v1/user/${user}?api_key=${api_key}&application_key=${app_key}"
