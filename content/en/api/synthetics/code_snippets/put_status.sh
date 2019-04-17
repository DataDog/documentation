#!/bin/bash

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=<the ID of the test you want to update>

curl -X PUT -H "Content-type: application/json" \
-d '{"new_status":"paused"}' \
"https://api.datadoghq.com/api/v1/synthetics/tests/${test_id}/status?api_key=${api_key}&application_key=${app_key}"
