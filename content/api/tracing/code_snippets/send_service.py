import json
import requests

# Send the service.
headers = {'Content-type': 'application/json'}
data = {"service_name": {"app": "my-app","app_type": "web"}}

requests.put('http://localhost:8126/v0.3/services', headers=headers, data = json.dumps(data))
