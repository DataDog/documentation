from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Schedule downtime
api.Downtime.create(scope='env:staging', start=int(time.time()))
