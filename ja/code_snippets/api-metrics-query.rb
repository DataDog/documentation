require 'rubygems'
require 'dogapi'

api_key = "9775a026f1ca7d1c6c5af9d94d9595a4"
application_key = "87ce4a24b5553d2e482ea8a8500e71b8ad4554ff"

dog = Dogapi::Client.new(api_key, application_key)

# Get points from the last hour
from = Time.now - 3600
to = Time.now
query = 'system.cpu.idle{*}by{host}'

dog.get_points(query, from, to)
