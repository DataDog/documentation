from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Unmute all alerts
api.Monitor.unmute_all()
