api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

start_hr=$(date -v -10d +%Y-%m-%dT%H)
end_hr=$(date +%Y-%m-%dT%H)

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "start_hr=${start_hr}" \
-d "end_hr=${end_hr}" \
"https://api.datadoghq.com/api/v1/usage/hosts"
