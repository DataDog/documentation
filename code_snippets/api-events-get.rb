require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

event_id = '1375909614428331251'
dog.get_event(event_id)
