from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
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

api.Metadata.update(metric_name=metric, **params)
