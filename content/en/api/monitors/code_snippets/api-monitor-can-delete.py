from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Check if you can delete the given monitors.
api.Monitor.can_delete(monitor_ids=[2081, 2082])
