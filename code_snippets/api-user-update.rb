# Make sure you replace the API and or APP key below with the ones for your account
require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

dog.update_user('test@datadoghq.com', :email => 'test+1@datadoghq.com', :name => 'alt name')
