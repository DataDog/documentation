# Note: this end point only accepts form-encoded requests.
currenttime=$(date +%s)
currenttime2=$(date --date='1 day ago' +%s)
curl -G -H "Content-type: application/json" \
    -d "start=${currenttime2}" \
    -d "end=${currenttime}" \
    -d "sources=My Apps" \
    -d "tags=application:web,version:1" \
    -d "api_key=<YOUR_API_KEY>" \
    -d "application_key=<YOUR_APP_KEY>" \
    'https://api.datadoghq.com/api/v1/events'
