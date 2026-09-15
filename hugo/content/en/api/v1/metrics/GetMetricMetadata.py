from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

metric = 'system.cpu.idle'

api.Metadata.get(metric_name=metric)
