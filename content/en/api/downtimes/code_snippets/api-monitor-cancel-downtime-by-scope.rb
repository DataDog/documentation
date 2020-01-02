require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Cancel all downtimes with the given scope
dog.cancel_downtime_by_scope('env:testing')
