#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -v -X POST -H "Content-type: application/json" \
-d '{
    "service_hooks": [
      {
        "account": "Main_Account",
        "url": "https://hooks.slack.com/services/1/1/1"
      },
      {
        "account": "doghouse",
        "url": "https://hooks.slack.com/services/2/2/2"
      }
    ]
  }' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"
