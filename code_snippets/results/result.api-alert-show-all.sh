{
    "alerts": [
        {
            "creator": 3658, 
            "event_object": "f64854a9d66cd1eea9d77ec82588ff91", 
            "id": 273, 
            "message": " @pagerduty", 
            "name": "Load AVG on host:alexsolo", 
            "notify_no_data": false, 
            "query": "avg(last_10m):max:system.load.5{host:alexsolo} > 6", 
            "silenced": false, 
            "state": "OK"
        }, 
        {
            "creator": 3658, 
            "event_object": "f64854a9d66cd1eea9d77ec82588ff91", 
            "id": 274, 
            "message": " @pagerduty", 
            "name": "Load AVG on host:alexsolo", 
            "notify_no_data": false, 
            "query": "avg(last_1m):max:system.load.5{host:alexsolo} > 6", 
            "silenced": false, 
            "state": "OK"
        }
    ]
}
