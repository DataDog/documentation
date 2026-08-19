require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'

dog = Dogapi::Client.new(api_key)

# Submit one metric value.
dog.emit_point('some.metric.name', 50.0, :host => "my_host.example.com")

# Submit multiple metric values
points = [
    [Time.now, 0],
    [Time.now + 10, 10.0],
    [Time.now + 20, 20.0]
]
dog.emit_points('some.metric.name', points, :tags => ["version:1"])

# Emit differents metrics in a single request to be more efficient
dog.batch_metrics do
  dog.emit_point('test.api.test_metric',10)
  dog.emit_point('test.api.this_other_metric', 1)
end
