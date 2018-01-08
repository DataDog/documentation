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
"https://app.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}&run_check=true" | python -mjson.tool

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
"https://app.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}&run_check=true" | python -mjson.tool


curl -v "https://app.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}" | python -mjson.tool


curl -v -X DELETE "https://app.datadoghq.com/api/v1/integration/slack?api_key=${api_key}&application_key=${app_key}" | python -mjson.tool