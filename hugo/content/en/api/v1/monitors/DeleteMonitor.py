from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Delete a monitor
api.Monitor.delete(2081)

# Force delete a monitor to override warnings
api.Monitor.delete(2081, force=True)
