#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -v -X PUT -H "Content-type: application/json" \
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
      "subdomain": "<PAGERDUTY_SUB_DOMAIN>",
      "schedules": ["<SCHEDULE_1>", "<SCHEDULE_2>"],
      "api_token": "<PAGERDUTY_TOKEN>"
  }' \
"https://api.datadoghq.com/api/v1/integration/pagerduty?api_key=${api_key}&application_key=${app_key}"