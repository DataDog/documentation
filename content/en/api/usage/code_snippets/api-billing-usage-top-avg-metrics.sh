api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

month=$(date +%Y-%m)

curl -G \
    "https://api.datadoghq.com/api/v1/usage/top_avg_metrics" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "month=${month}" \
    -d "names=aws.ec2.spot_history,system.processes.number"