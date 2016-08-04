require 'rubygems'
require 'dogapi'

api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
app_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Snapshot a graph
end_ts = Time.now().to_i
start_ts = end_ts - (60 * 60)
dog.graph_snapshot('system.load.1{*}', start_ts, end_ts)
