# Note: this end point only accepts form-encoded requests.
currenttime=$(date +%s)
currenttime2=$(date --date='1 day ago' +%s)
curl -G -H "Content-type: application/json" \
    -d "start=${currenttime2}" \
    -d "end=${currenttime}" \
    -d "api_key=9775a026f1ca7d1c6c5af9d94d9595a4" \
    -d "application_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff" \
    'https://app.datadoghq.com/api/v1/events'
