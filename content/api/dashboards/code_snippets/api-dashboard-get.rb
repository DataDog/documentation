require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dashboard_id = 'qc9-tuk-9kv'
dog.get_board(dashboard_id)
