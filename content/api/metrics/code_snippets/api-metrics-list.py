from datadog import initialize, api
import time

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

# Taking the last 24hours
from_time = int(time.time()) - 60*60*24*1

result = api.Metric.list(from_time)

print(result)