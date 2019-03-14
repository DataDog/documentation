require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# retrieve all screenboards (dashboard with `free` layout)
dog.get_all_boards('free')

# retrieve all timeboards (dashboard with `ordered` layout)
dog.get_all_boards('ordered')

# retrieve all custom dashboards (dashboard with `free` or `ordered` layout)
dog.get_all_boards()
