api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

start_month=$(date -v -60d +%Y-%m)
end_month=$(date +%Y-%m)
include_org_details=true

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "start_month=${start_month}" \
-d "end_month=${end_month}" \
-d "include_org_details=${include_org_details}" \
"https://api.datadoghq.com/api/v1/usage/summary"
