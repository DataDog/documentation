api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff

month=$(date +%Y-%m)

curl -G \
    "https://api.datadoghq.com/api/v1/usage/top_avg_metrics" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
    -d "month=${month}" \
    -d "names=aws.ec2.spot_history,system.processes.number"
