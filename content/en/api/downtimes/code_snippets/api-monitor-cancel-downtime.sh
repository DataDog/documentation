api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
downtime_id=1656

# Create a downtime to delete
currenttime=$(date +%s)
downtime_id=$(curl -X POST -H "Content-type: application/json" \
-d "{
      \"scope\": \"env:prod\",
      \"start\": \"${currenttime}\"
  }" \
    "https://api.datadoghq.com/api/v1/downtime?api_key=${api_key}&application_key=${app_key}" | jq '.id')

curl -X DELETE -H "Content-type: application/json" "https://api.datadoghq.com/api/v1/downtime/${downtime_id}?api_key=${api_key}&application_key=${app_key}"