from datadog import initialize, api
import json

# Intialize request parameters including API/APP key
options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Create an embed graph definition as a dict and format as JSON
graph_json = {
    "requests": [{
        "q": "avg:system.load.1{*}"
    }],
    "viz": "timeseries",
    "events": []
}
graph_json = json.dumps(graph_json)

api.Embed.create(graph_json=graph_json, timeframe="1_hour", size="medium", legend="no")
