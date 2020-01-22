require 'net/http'
require 'json'

# Create IDs.
TRACE_ID = rand(1..1000000)
SPAN_ID = rand(1..1000000)

# Start a timer.
START_TIME = Time.now

# Do things...
sleep 2

END_TIME = Time.now

START = (START_TIME.to_f * 1e9).to_i
DURATION = ((END_TIME - START_TIME) * 1e9).to_i

# Send the traces.
port = 8126
host = "127.0.0.1"
path = "/v0.4/traces"

req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'application/json', 'X-Datadog-Trace-Count' => '1'})

req.body = [[{ \
			"trace_id": TRACE_ID, \
			"span_id": SPAN_ID, \
			"name": "span_name", \
			"resource": "/home", \
			"service": "service_name", \
			"type": "web", \
			"start": START, \
			"duration": DURATION \
		}]].to_json

response = Net::HTTP.new(host, port).start {|http| http.request(req) }
