curl -v -X POST -H "Content-type: application/json" \
-d '{
    "service_hooks": [
      {
        "account": "Main_Account",
        "url": "https://hooks.slack.com/services/1/1"
      },
      {
        "account": "doghouse",
        "url": "https://hooks.slack.com/services/2/2"
      }
    ],
    "channels": [
      {
        "channel_name": "#private",
        "transfer_all_user_comments": "false",
        "account": "Main_Account"
      },
      {
        "channel_name": "#heresachannel",
        "transfer_all_user_comments": "false",
        "account": "doghouse"
      }
    ]
  }' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}&run_check=true"

curl -v -X PUT -H "Content-type: application/json" \
-d '{
    "service_hooks": [
      {
        "account": "Main_Account",
        "url": "https://hooks.slack.com/services/1/1"
      },
      {
        "account": "doghouse",
        "url": "https://hooks.slack.com/services/2/2"
      }
    ],
    "channels": [
      {
        "channel_name": "#private",
        "transfer_all_user_comments": "false",
        "account": "Main_Account"
      },
      {
        "channel_name": "#heresachannel",
        "transfer_all_user_comments": "false",
        "account": "doghouse"
      }
    ]
}' \
"https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}&run_check=true"

curl -v "https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"

curl -v -X DELETE "https://api.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}"