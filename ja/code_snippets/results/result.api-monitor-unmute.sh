{
    "id": 62628,
    "message": "",
    "name": "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 200",
    "options": {
        "is_data_sparse": false,
        "notify_audit": true,
        "notify_no_data": false,
        "renotify_interval": null,
        "silenced": {
            "*": null
        },
        "timeout_h": null
    },
    "org_id": 1499,
    "query": "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 200",
    "state": {},
    "type": "metric alert",
    "created": "2015-12-18T16:34:14.014039+00:00",
    "modified": "2015-12-18T18:39:24.391207+00:00"
}
