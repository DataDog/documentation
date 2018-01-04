import random
import time 
import requests

# Create IDs.
TRACE_ID=random.randint(1,1000000)
SPAN_ID=random.randint(1,1000000)

# Start a timer.
START=int(time.time() * 1000000)

# Do things...
time.sleep(2)

# Stop the timer.
DURATION= int(time.time() * 1000000) - START

# Send the traces.
headers = {'Content-type': 'application/json'}
data = {\
	"trace_id": TRACE_ID,\
	"span_id": SPAN_ID,\
	"name": "span_name",\
	"resource": "/home",\
	"service": "service_name",\
	"type": "web",\
	"start": START,\
	"duration": DURATION}
	
requests.put('http://localhost:8126/v0.3/traces', data = data, headers=headers)