require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

config= {
    "hooks": [
      {
        "name": "Example",
        "url": "http://example.com/2"
      }
    ]
}

dog = Dogapi::Client.new(api_key, app_key)

dog.update_integration('webhooks', config)
