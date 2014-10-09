from dogapi import dog_http_api as api

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

# Create a new monitor
options = {
    "notify_no_data": True,
    "no_data_timeframe": 20
}
api.monitor("metric alert", "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100", "Bytes received on host0", "We may need to add web hosts if this is consistently high.", options=options)
