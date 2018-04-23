require 'rubygems'
require 'dogapi'

api_key = "<YOUR_API_KEY>"

dog = Dogapi::Client.new(api_key)

# Get metadata on metric
result = dog.get_metadata('system.net.bytes_sent')
