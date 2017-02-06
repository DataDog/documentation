import requests

# Send the service.
service = {
    "service_name": {
        "app": "my-app",
        "app_type": "web"
    }
}

response = requests.put("http://localhost:7777/v0.3/services", json=service)
