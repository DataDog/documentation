api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

list_id=4741

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}"
