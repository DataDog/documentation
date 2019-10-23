
currenttime=$(date +%s)
currenttime2=$(date -v -1d +%s)

curl -X GET \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "metric_query=system.load.1{*}" \
-d "start=${currenttime2}" \
-d "end=${currenttime}" \
"https://api.datadoghq.com/api/v1/graph/snapshot"

