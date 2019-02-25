api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
downtime_id=4336

# Create a downtime to update
currenttime=$(date +%s)
downtime_id=$(curl -X POST -H "Content-type: application/json" \
-d "{
      \"scope\": \"env:prod\",
      \"start\": \"${currenttime}\"
  }" \
    "https://api.datadoghq.com/api/v1/downtime?api_key=${api_key}&application_key=${app_key}" | jq '.id')

curl -X PUT -H "Content-type: application/json" \
-d '{
      "scope": "env:staging",
      "message": "Doing some testing on staging"
}' \
    "https://api.datadoghq.com/api/v1/downtime/${downtime_id}?api_key=${api_key}&application_key=${app_key}"