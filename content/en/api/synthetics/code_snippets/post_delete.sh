#!/bin/bash

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
   "public_ids":[
      "aaa-bbb-ccc",
      "bbb-ccc-ddd"
   ]
}' \
"https://api.datadoghq.com/api/v1/synthetics/tests/delete"
