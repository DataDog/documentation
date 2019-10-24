api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

month=$(date +%Y-%m)

curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d "month=${month}" \
-d "names=aws.ec2.spot_history,system.processes.number" \
"https://api.datadoghq.com/api/v1/usage/top_avg_metrics"
