from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Create a new monitor
monitor_options = {
    "notify_no_data": True,
    "no_data_timeframe": 20
}
tags = ["app:webserver", "frontend"]
api.Monitor.create(
    type="metric alert",
    query="avg(last_5m):sum:system.net.bytes_rcvd{host:host0} > 100",
    name="Bytes received on host0",
    message="We may need to add web hosts if this is consistently high.",
    tags=tags,
    options=monitor_options
)
