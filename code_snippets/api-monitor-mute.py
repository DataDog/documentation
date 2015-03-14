from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Mute a monitor
api.Monitor.mute(2088)
