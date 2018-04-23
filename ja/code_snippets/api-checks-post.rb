require 'rubygems'
require 'dogapi'

api_key='<YOUR_API_KEY>'
app_key='<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# submitting events doesn't require an application_key, so we don't bother
# setting it
dog = Dogapi::Client.new(api_key)

dog.service_check('app.is_ok', 'app1', 0, :message => 'Response: 200 OK')
