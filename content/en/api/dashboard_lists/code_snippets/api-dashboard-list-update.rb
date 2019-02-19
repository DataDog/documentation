require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
name = 'My Updated Dashboard List'

result = dog.update_dashboard_list(list_id, name)