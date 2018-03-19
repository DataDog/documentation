api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

start_month=$(date -v -60d +%Y-%m)
end_month=$(date +%Y-%m)
include_org_details=false

curl -G \
    "https://app.datadoghq.com/api/v1/usage/summary" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "start_month=${start_month}" \
    -d "end_month=${end_month}" \
    -d "include_org_details=${include_org_details}"
