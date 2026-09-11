require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

end_ts = Time.now().to_i
start_ts = end_ts - (60 * 60)
dog.graph_snapshot("system.load.1{*}", start_ts, end_ts)