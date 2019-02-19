require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dog.update_user('test@datadoghq.com', :email => 'test+1@datadoghq.com', :name => 'alt name', :access_role => 'ro')
