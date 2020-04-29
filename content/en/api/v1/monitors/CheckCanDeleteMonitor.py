from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Check if you can delete the given monitors.
api.Monitor.can_delete(monitor_ids=[56838, 771060, 1000376])
