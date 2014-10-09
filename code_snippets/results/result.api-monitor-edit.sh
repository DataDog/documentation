{
    "id": 91879,
    "message": "We may need to add web hosts if this is consistently high.",
    "name": "Bytes received on host0",
    "options": {
        "notify_audit": false,
        "notify_no_data": false,
        "silenced": {}
    },
    "org_id": 1499,
    "query": "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100",
    "state": {},
    "type": "metric alert"
}
