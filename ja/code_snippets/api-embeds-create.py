from datadog import initialize, api
import json

# Intialize request parameters including API/APP key
options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
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
