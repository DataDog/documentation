#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
slo_id=<YOUR_SLO_ID>

# Edit a SLO
curl -X PUT -H "Content-type: application/json" \
-d '{
      "name": "Host0 uptime",
      "description": "We may need to replace this host if it is constantly down."
}' \
    "https://api.datadoghq.com/api/v1/slo/${slo_id}?api_key=${api_key}&application_key=${app_key}"
