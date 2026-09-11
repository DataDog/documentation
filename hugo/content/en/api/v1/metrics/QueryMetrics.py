from datadog import initialize, api
import time

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

now = int(time.time())

query = 'system.cpu.idle{*}by{host}'
print(api.Metric.query(start=now - 3600, end=now, query=query))
