from datadog import initialize, api

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

# Create a new monitor
options = {
    "notify_no_data": True,
    "no_data_timeframe": 20
}
tags = ["app:webserver", "frontend"]
api.Monitor.create(type="metric alert", query="avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100", name="Bytes received on host0", message="We may need to add web hosts if this is consistently high.", tags=tags, options=options)
