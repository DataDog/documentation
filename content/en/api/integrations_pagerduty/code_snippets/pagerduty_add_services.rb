require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
    "services": [
      {
        "service_name": "test_00",
        "service_key": "<PAGERDUTY_SERVICE_KEY>"
      },
      {
        "service_name": "test_01",
        "service_key": "<PAGERDUTY_SERVICE_KEY>"
      }
    ],
    "schedules": ["<SCHEDULE_1>", "<SCHEDULE_2>"],
}

dog = Dogapi::Client.new(api_key, app_key)

dog.update_integration('pagerduty', config)
