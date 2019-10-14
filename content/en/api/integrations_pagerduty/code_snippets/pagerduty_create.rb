require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
    "services": [
      {
        "service_name": "<SERVICE_NAME_1>",
        "service_key": "<PAGERDUTY_SERVICE_KEY>"
      },
      {
        "service_name": "<SERVICE_NAME_2>",
        "service_key": "<PAGERDUTY_SERVICE_KEY>"
      }
    ],
    "subdomain": "<PAGERDUTY_SUB_DOMAIN>",
    "schedules": ["<SCHEDULE_1>", "<SCHEDULE_2>"],
    "api_token": "<PAGERDUTY_TOKEN>"
  }

dog = Dogapi::Client.new(api_key, app_key)

dog.create_integration('pagerduty', config)
