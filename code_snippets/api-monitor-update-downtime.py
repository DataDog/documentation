from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Update downtime
api.Downtime.update(4336, scope='env:staging', end=int(time.time()) + 60000, message="Doing some testing on staging.")
