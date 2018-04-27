from datadog import initialize, api
import time

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Take a graph snapshot
end = int(time.time())
start = end - (60 * 60)
api.Graph.create(metric_query="system.load.1{*}", start=start, end=end)
