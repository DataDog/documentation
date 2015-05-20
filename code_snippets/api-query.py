#!/usr/bin/python
from datadog import initialize, api
import time

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

start = int(time.time()) - 3600
end = start + 3600
# query for idle CPU for all machines tagged with speed:4000
query = 'system.cpu.idle{*}by{host}'

results = api.Metric.query(start=start - 3600, end=end, query=query)
print results
