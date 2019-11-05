require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Check if you can delete the given monitors.
dog.can_delete_monitors([56838, 771060, 1000376])
