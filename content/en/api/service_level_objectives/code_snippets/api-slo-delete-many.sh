#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"
slo_ids=<YOUR_SLO_IDS_CSV>

# Delete a SLO
curl -X DELETE \
-H "Content-Type: applicaton/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '[${slo_ids}]' \
"https://api.datadoghq.com/api/v1/slo/"
