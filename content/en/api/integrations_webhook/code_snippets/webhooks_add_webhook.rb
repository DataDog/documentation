require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

config= {
    "hooks": [
      {
        "name": "Example",
        "url": "http://example.com/2"
      }
    ]
}

dog = Dogapi::Client.new(api_key, app_key)

# Warning: this function makes a PUT call to Datadog API
# It updates your integration configuration by REPLACING
# your current configuration with the new one.
dog.update_integration('webhooks', config)
