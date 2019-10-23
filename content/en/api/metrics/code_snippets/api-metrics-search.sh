api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "api_key=${api_key}" \
-d "application_key=${app_key}" \
-d "q=metrics:test" \
"https://api.datadoghq.com/api/v1/search"

