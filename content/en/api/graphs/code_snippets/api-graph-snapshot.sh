
currenttime=$(date +%s)
currenttime2=$(date -v -1d +%s)

curl -G -H "Content-type: application/json" \
    -d "metric_query=system.load.1{*}" \
    -d "start=${currenttime2}" \
    -d "end=${currenttime}" \
    -d "api_key=<YOUR_API_KEY>" \
    -d "application_key=<YOUR_APP_KEY>" \
    "https://api.datadoghq.com/api/v1/graph/snapshot"

