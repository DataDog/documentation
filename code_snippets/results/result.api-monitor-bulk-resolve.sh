[
  {
    "tags": [
      "*"
    ],
    "deleted": null,
    "query": "avg(last_1h):avg:system.cpu.user{role:cassandra} by {host} > 10",
    "message": "I'm a dummy test.",
    "id": 2610751,
    "multi": true,
    "name": "[Do not mind] This is a test",
    "created": "2017-08-09T14:30:38.584147+00:00",
    "created_at": 1502289038000,
    "org_id": 11287,
    "modified": "2017-08-09T14:36:48.176919+00:00",
    "overall_state_modified": "2017-08-11T12:21:05.949182+00:00",
    "overall_state": "Alert",
    "type": "metric alert",
    "options": {
      "notify_audit": false,
      "locked": false,
      "timeout_h": 0,
      "silenced": {},
      "include_tags": false,
      "no_data_timeframe": 10,
      "new_host_delay": 300,
      "require_full_window": false,
      "notify_no_data": false,
      "renotify_interval": 0,
      "escalation_message": "",
      "thresholds": {
        "critical": 10,
        "warning": 5
      }
    }
  }
]