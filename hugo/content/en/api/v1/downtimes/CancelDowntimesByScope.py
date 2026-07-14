from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Cancel all downtimes with scope
api.Downtime.cancel_downtime_by_scope('env:testing')
