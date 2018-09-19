#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -v -X POST -H "Content-type: application/json" \
-d '{
    "hooks": [
      {
        "name": "<WEBHOOK_NAME>",
        "url": "<WEBHOOK_URL>",
        "use_custom_payload": "false",
        "custom_payload": "",
        "encode_as_form": "false",
        "headers": ""
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"

curl -v -X PUT -H "Content-type: application/json" \
-d '{
    "hooks": [
      {
        "name": "<WEBHOOK_NAME>",
        "url": "<WEBHOOK_URL>"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"

curl -v "https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"

curl -v -X DELETE "https://api.datadoghq.com/api/v1/integration/webhooks?api_key=${api_key}&application_key=${app_key}"
