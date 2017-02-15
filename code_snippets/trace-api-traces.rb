require 'net/http'
require 'json'

# Create IDs.
trace_id = rand(1000000)
span_id = rand(1000000)

# Start a timer.
start = Time.now.strftime('%s%N').to_i

# Do things...
sleep 2

# Stop the timer.
duration = Time.now.strftime('%s%N').to_i - start

# Send the traces.
traces = [[{
    'trace_id' => trace_id,
    'span_id' => span_id,
    'name' => 'span_name',
    'resource' => '/home',
    'service' => 'service_name',
    'type' => 'web',
    'start' => start,
    'duration' => duration
}]]

uri = URI('http://localhost:7777/v0.3/traces')
request = Net::HTTP::Put.new(uri)
request.body = JSON.generate(traces)
request.content_type = 'application/json'

response = Net::HTTP.start(uri.hostname, uri.port) do |http|
    http.request(request)
end
