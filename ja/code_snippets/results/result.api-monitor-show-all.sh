[
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
        "type": "metric alert",
        "multi": false,
        "created": "2015-12-18T16:34:14.014039+00:00",
        "modified": "2015-12-18T16:34:14.014039+00:00"
    },
    {
        "id": 91875,
        "message": "",
        "name": "**system.net.bytes_rcvd** over **host:host0** was **> 100** on average during the **last 1h**.",
        "options": {
            "escalation_message": "",
            "no_data_timeframe": false,
            "notify_audit": true,
            "notify_no_data": false,
            "renotify_interval": null,
            "silenced": {},
            "timeout_h": null
        },
        "org_id": 1499,
        "query": "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100",
        "type": "metric alert",
        "multi": false,
        "created": "2015-12-18T16:34:14.014039+00:00",
        "modified": "2015-12-18T16:34:14.014039+00:00"
    }
]
