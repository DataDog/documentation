#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
slo_id=<YOUR_SLO_ID>

# Check if it is safe to delete a SLO
curl -X GET "https://api.datadoghq.com/api/v1/slo/can_delete?api_key=${api_key}&application_key=${app_key}&ids=${slo_id}"
