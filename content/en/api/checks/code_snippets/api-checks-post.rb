require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# submitting a check doesn't require an app_key
dog = Dogapi::Client.new(api_key)

dog.service_check('app.is_ok', 'app1', 0, :message => 'Response: 200 OK', :tags => ['env:test'])
