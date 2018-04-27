api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

start_month=$(date -v -60d +%Y-%m)
end_month=$(date +%Y-%m)
include_org_details=true

curl -G \
    "https://api.datadoghq.com/api/v1/usage/summary" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "start_month=${start_month}" \
    -d "end_month=${end_month}" \
    -d "include_org_details=${include_org_details}"
