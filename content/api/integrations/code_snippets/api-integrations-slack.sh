#!/bin/sh
# Make sure you replace the <DD_API_KEY> and <DD_APP_KEY> key below
# with the ones for your account

api_key=<DD_API_KEY>
app_key=<DD_APP_KEY>

curl -v -X POST -H "Content-type: application/json" \
-d '{
    "service_hooks": [
      {
        "account": "<SLACK_ACCOUNT_1>",
        "url": "https://hooks.slack.com/services/1/1"
      },
      {
        "account": "<SLACK_ACCOUNT_2>",
        "url": "https://hooks.slack.com/services/2/2"
      }
    ],
    "channels": [
      {
        "channel_name": "<CHANNEL_NAME_1>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_1>"
      },
      {
        "channel_name": "<CHANNEL_NAME_2>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_2>"
      }
    ]
  }' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"

curl -v -X PUT -H "Content-type: application/json" \
-d '{
    "service_hooks": [
      {
        "account": "<SLACK_ACCOUNT_1>",
        "url": "https://hooks.slack.com/services/1/1"
      },
      {
        "account": "<SLACK_ACCOUNT_2>",
        "url": "https://hooks.slack.com/services/2/2"
      }
    ],
    "channels": [
      {
        "channel_name": "<CHANNEL_NAME_1>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_1>"
      },
      {
        "channel_name": "<CHANNEL_NAME_2>",
        "transfer_all_user_comments": "false",
        "account": "<SLACK_ACCOUNT_2>"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"

# Adding channels to existing configurations
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
"https://app.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"

curl -v "https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"

curl -v -X DELETE "https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"
