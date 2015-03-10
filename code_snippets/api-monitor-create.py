from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Create a new monitor
options = {
    "notify_no_data": True,
    "no_data_timeframe": 20
}
api.Monitor.create(type="metric alert", query="avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100", name="Bytes received on host0", message="We may need to add web hosts if this is consistently high.", options=options)
