from datadog import initialize, api

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

metric = 'system.net.bytes_sent'
params = {
    'description': 'My custom description',
    'short_name': 'bytes sent',
    'type': 'gauge',
    'unit': 'byte',
    'per_unit': 'second'
}

print api.Metadata.update(metric_name=metric, **params)
