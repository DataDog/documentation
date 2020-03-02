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

# Warning: this function makes a PUT call to Datadog API
# It updates your integration configuration by REPLACING
# your current configuration with the new one.
dog.update_integration('slack', config)
