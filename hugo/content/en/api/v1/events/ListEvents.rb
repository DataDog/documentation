require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

end_time = Time.now.to_i
start_time = end_time - 100

dog.stream(start_time, end_time, :priority => "normal", :tags => ["-env:dev,application:web"], :unaggregated => true)