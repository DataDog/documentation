api_key="<YOUR_API_KEY>"
app_key="<YOUR_APP_KEY>"
downtime_id=1656

# Create a downtime to delete
currenttime=$(date +%s)
downtime_id=$(curl -X POST \
    -H "Content-type: application/json" \
    -H "DD-API-KEY: ${api_key}" \
    -H "DD-APPLICATION-KEY: ${app_key}" \
    -d "{
      \"scope\": \"env:prod\",
      \"start\": \"${currenttime}\"
    }" \
    "https://api.datadoghq.com/api/v1/downtime" | jq '.id')

curl -X DELETE \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/downtime/${downtime_id}"
