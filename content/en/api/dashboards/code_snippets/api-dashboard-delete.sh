api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
dashboard_id="<DASHBOARD_ID>"

curl -X DELETE \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/dashboard/${dashboard_id}"
