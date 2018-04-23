from datadog import initialize,  api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Edit an existing monitor
api.Monitor.update(
    2081,
    query="avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100",
    name="Bytes received on host0",
    message="We may need to add web hosts if this is consistently high."
)
