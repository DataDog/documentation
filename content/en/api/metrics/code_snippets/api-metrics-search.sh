api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "api_key=${api_key}" \
-d "application_key=${app_key}" \
"https://api.datadoghq.com/api/v1/search?q=metrics:aws"
