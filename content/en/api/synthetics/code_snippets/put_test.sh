#!/bin/bash

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
test_id=<the ID of the test you want to update>

curl  -X POST -H "Content-type: application/json" \
-d '{
    "message": "test-edited",
}
' \
https://api.datadoghq.com/api/v1/synthetics/tests/{test_id}?api_key=${api_key}&application_key=${app_key}
