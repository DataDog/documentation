require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

config= {
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
}

dog = Dogapi::Client.new(api_key, app_key)

dog.update_integration('slack', config)
