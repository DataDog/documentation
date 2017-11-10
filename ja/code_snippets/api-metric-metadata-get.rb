require 'rubygems'
require 'dogapi'

api_key = "9775a026f1ca7d1c6c5af9d94d9595a4"

dog = Dogapi::Client.new(api_key)

# Get metadata on metric
result = dog.get_metadata('system.net.bytes_sent')
