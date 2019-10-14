require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
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
  }

dog = Dogapi::Client.new(api_key, app_key)

dog.create_integration('slack', config)
