{
    "id": 92090,
    "message": "We may need to add web hosts if this is consistently high.",
    "name": "Bytes received on host0",
    "tags": ["app:webserver", "frontend"],
    "options": {
        "no_data_timeframe": 20,
        "notify_audit": false,
        "notify_no_data": true,
        "silenced": {}
    },
    "org_id": 1499,
    "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} > 100",
    "state": {},
    "type": "metric alert",
    "multi": false,
    "created": "2015-12-18T16:34:14.014039+00:00",
    "modified": "2015-12-18T16:34:14.014039+00:00"
}
