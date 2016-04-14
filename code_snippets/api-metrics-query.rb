require 'rubygems'
require 'dogapi'

api_key = "abcd123"
application_key = "brec1252"

dog = Dogapi::Client.new(api_key, application_key)

# Get points from the last hour
from = Time.now - 3600
to = Time.now
query = 'system.cpu.idle{*}by{host}'

dog.get_points(query, from, to)
