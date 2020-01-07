#!/bin/sh

api_key="<DATADOG_API_KEY>"
app_key="<DATADOG_APPLICATION_KEY>"

curl -X POST \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
    "channels": [
        {
          "channel_name": "#channel_name_main_account",
          "transfer_all_user_comments": "false",
          "account": "Main_Account"
        },
        {
          "channel_name": "#channel_name_doghouse",
          "transfer_all_user_comments": "false",
          "account": "doghouse"
        }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/slack"
