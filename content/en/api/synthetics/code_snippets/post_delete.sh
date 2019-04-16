#!/bin/bash

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=<the ID of the test you want to update>

curl  -X POST -H "Content-type: application/json" \
-d '{
    "public_ids": "262647, 262648"
}' \
https://api.datadoghq.com/api/v1/synthetics/tests/delete?api_key=${api_key}&application_key=${app_key}
