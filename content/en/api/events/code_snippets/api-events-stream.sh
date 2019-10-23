# Note: this endpoint only accepts form-encoded requests.
currenttime=$(date +%s)
currenttime2=$(date --date='1 day ago' +%s)

curl -X GET \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "start=${currenttime2}" \
-d "end=${currenttime}" \
-d "sources=My Apps" \
-d "tags=-env:dev,application:web" \
-d "unaggregated=true"\
"https://api.datadoghq.com/api/v1/events"
