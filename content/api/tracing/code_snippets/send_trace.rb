require 'net/http'

# Create IDs.
TRACE_ID = rand(1..1000000)
SPAN_ID = rand(1..1000000)

# Start a timer.
START = Time.now.to_f

# Do things...
sleep 2

# Stop the timer.
DURATION = ((Time.now.to_f - START)* 1000000).to_i

# Send the traces.
port = 8126
host = "127.0.0.1"
path = "/v0.3/traces"

req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'application/json'})

req.body = [[{ \
			"trace_id": TRACE_ID, \
			"span_id": SPAN_ID, \
			"name": "span_name", \
			"resource": "/home", \
			"service": "service_name", \
			"type": "web", \
			"start": START, \
			"duration": DURATION \
		}]]

response = Net::HTTP.new(host, port).start {|http| http.request(req) }