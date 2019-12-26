#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -v -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "hooks": [
      {
        "name": "<WEBHOOK_NAME>",
        "url": "<WEBHOOK_URL>"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/webhooks"
