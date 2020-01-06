#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "services": [
        {
          "service_name": "test_00",
          "service_key": "<PAGERDUTY_SERVICE_KEY>"
        },
        {
          "service_name": "test_01",
          "service_key": "<PAGERDUTY_SERVICE_KEY>"
        }
      ],
      "schedules": ["<SCHEDULE_1>", "<SCHEDULE_2>"],
  }' \
"https://api.datadoghq.com/api/v1/integration/pagerduty"
