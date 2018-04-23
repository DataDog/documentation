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
api.Graph.create(
    graph_def='{\
    "viz": "timeseries", \
    "requests": [ \
      {"q": "avg:system.load.1{*}", "conditional_formats": [], "type": "line"},\
      {"q": "avg:system.load.5{*}", "type": "line"}, \
      {"q": "avg:system.load.15{*}", "type": "line"}\
      ], \
    "events": [\
      {"q": "hosts:* ", "tags_execution": "and"}\
      ]}',
    start=start,
    end=end
)
