#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "service_name": "test_00",
      "service_key": "<PAGERDUTY_SERVICE_KEY>"
  }' \
"https://api.datadoghq.com/api/v1/integration/pagerduty/configuration/services"





