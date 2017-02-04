import random
import requests
import time

# Create IDs.
trace_id = random.randrange(1, 1000000)
span_id = random.randrange(1, 1000000)

# Start a timer.
start = int(time.time() * 1000000000)

# Do things...
time.sleep(2)

# Stop the timer.
duration = int(time.time() * 1000000000) - start

# Send the traces.
traces = [[{
    "trace_id": trace_id,
    "span_id": span_id,
    "name": "span_name",
    "resource": "/home",
    "service": "service_name",
    "type": "web",
    "start": start,
    "duration": duration
  }]]

response = requests.put("http://localhost:7777/v0.3/traces", json=traces)
