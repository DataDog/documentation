from datadog import initialize, api
import time

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

now = int(time.time())

query = 'system.cpu.idle{*}by{host}'
print(api.Metric.query(start=now - 3600, end=now, query=query))
