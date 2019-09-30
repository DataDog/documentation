#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
slo_ids=<YOUR_SLO_IDS_CSV>

# Delete a SLO
curl -X DELETE -H "Content-Type: applicaton/json" -d '[${slo_ids}]' \
  "https://api.datadoghq.com/api/v1/slo/?api_key=${api_key}&application_key=${app_key}"
