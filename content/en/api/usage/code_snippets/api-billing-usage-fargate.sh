api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

start_hr=$(date -v -10d +%Y-%m-%dT%H)
end_hr=$(date +%Y-%m-%dT%H)

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/usage/fargate?&start_hr=${start_hr}&end_hr=${end_hr}"
