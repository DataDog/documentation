api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
downtime_id=4336

# Create a downtime to update
currenttime=$(date +%s)
downtime_id=$(curl -X POST \
    -H "Content-type: application/json" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "{
      \"scope\": \"env:prod\",
      \"start\": \"${currenttime}\"
    }" \
    "https://api.datadoghq.com/api/v1/downtime}" | jq '.id')

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "scope": "env:staging",
      "message": "Doing some testing on staging"
}' \
"https://api.datadoghq.com/api/v1/downtime/${downtime_id}"
