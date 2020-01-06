#!/bin/sh
# Make sure you replace the <DATADOG_API_KEY> and <DATADOG_APPLICATION_KEY> key below
# with the ones for your account

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -v -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
      "services": [
        {
          "service_name": "<SERVICE_NAME_1>",
          "service_key": "<PAGERDUTY_SERVICE_KEY>"
        },
        {
          "service_name": "<SERVICE_NAME_2>",
          "service_key": "<PAGERDUTY_SERVICE_KEY>"
        }
      ],
      "subdomain": "<PAGERDUTY_SUB_DOMAIN>",
      "schedules": ["<SCHEDULE_1>", "<SCHEDULE_2>"],
      "api_token": "<PAGERDUTY_TOKEN>"
  }' \
"https://api.datadoghq.com/api/v1/integration/pagerduty"
