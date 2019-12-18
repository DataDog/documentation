require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Search monitors
dog.search_monitors

# Examples of possible query parameters:
# dog.search_monitors(query="id:7100311")
# dog.search_monitors(query="title:foo metric:system.core.idle status:Alert")
