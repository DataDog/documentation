#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
slo_id=<YOUR_SLO_ID>
to_ts=<to epoch timestamp>
from_ts=<from epoch timestamp>

# Get SLO history
curl -X GET \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
"https://api.datadoghq.com/api/v1/slo/${slo_id}?from_ts=${from_ts}&to_ts={$to_ts}"
