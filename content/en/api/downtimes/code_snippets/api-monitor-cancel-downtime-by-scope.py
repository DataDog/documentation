from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Cancel all downtimes with scope
api.Downtime.cancel_downtime_by_scope('env:testing')
