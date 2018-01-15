from datadog import initialize, api
import time

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
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
