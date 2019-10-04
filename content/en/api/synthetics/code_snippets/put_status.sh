#!/bin/bash

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
public_id=<SYNTHETICS_TEST_PUBLIC_ID>

curl -X PUT -H "Content-type: application/json" \
-d '{"new_status":"paused"}' \
"https://api.datadoghq.com/api/v1/synthetics/tests/${public_id}/status?api_key=${api_key}&application_key=${app_key}"
