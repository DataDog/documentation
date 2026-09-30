require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Get points from the last hour
from = Time.now - 3600
to = Time.now
query = 'system.cpu.idle{*}by{host}'

dog.get_points(query, from, to)