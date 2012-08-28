require 'rubygems'
require 'dogapi'

api_key = "abcdef123456"

dog = Dogapi::Client.new(api_key)

# Submit one metric value.
dog.emit_point('some.metric.name', 50.0, :host => "my_host.example.com")

# Submit multiple metric values
points = [[Time.now, 0], [Time.now + 10, 10.0], [Time.now + 20, 20.0]]
dog.emit_points('some.metric.name', points, tags => ["version:1"])
