# Note: this endpoint only accepts form-encoded requests.
currenttime=$(date +%s)
currenttime2=$(date --date='1 day ago' +%s)

curl -X GET \
    -H "Content-type: application/json" \
    -H "DD-API-KEY: $api_key" \
    -H "DD-APPLICATION-KEY: $app_key" \
    "https://api.datadoghq.com/api/v1/events?&start=${currenttime2}&end=${currenttime}&tags=check_type:api&sources=alert&unaggregated=true"
