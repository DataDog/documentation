import random
import time
import requests
import json

# Create IDs.
TRACE_ID = random.randint(1,1000000)
SPAN_ID = random.randint(1,1000000)

# Start a timer.
# START and DURATION must be nanoseconds
START = int(time.time() * 1000000000)

# Do things...
time.sleep(2)

# Stop the timer.
DURATION= int(time.time() * 1000000000) - START

# Send the traces.
headers = {"Content-Type": "application/json", "X-Datadog-Trace-Count": "1"} 

data = [[{
                "trace_id": TRACE_ID,
                "span_id": SPAN_ID,
                "name": "span_name",
                "resource": "/home",
                "service": "service_name",
                "type": "web",
                "start": START,
                "duration": DURATION
        }]]

requests.put("http://localhost:8126/v0.4/traces", data=json.dumps(data), headers=headers)
