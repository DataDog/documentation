from datadog import initialize, api
import time

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Taking the last 24hours
from_time = int(time.time()) - 60 * 60 * 24 * 1

result = api.Metric.list(from_time)

print(result)
