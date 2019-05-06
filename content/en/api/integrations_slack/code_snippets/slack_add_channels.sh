#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
    "channels": [
      {
        "channel_name": "<CHANNEL_NAME_3>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_1>"
      },
      {
        "channel_name": "<CHANNEL_NAME_4>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_2>"
      }
    ]
  }' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"
