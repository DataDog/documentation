#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

# Bulk Delete SLOs
curl -X POST -H "Content-Type: application/json" \
 -d '{"12341234123412341234123412341234": ["7d"], "43210000432100004321000043210000": ["30d"]}}' \
 "https://api.datadoghq.com/api/v1/slo/bulk_delete?api_key=${api_key}&application_key=${app_key}"
