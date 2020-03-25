require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

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

# Warning: this function makes a PUT call to the Datadog API
# It updates your integration configuration by REPLACING
# your current configuration with the new one.
dog.update_integration('pagerduty', config)
