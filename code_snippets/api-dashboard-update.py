from dogapi import dog_http_api as api

api.api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dash_id = 2524
title = "My Dashboard"
description = "A new and improved dashboard!"
graphs =  [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*} by {host}"}
        ],
    "viz": "timeseries"
    },
    "title": "Average Memory Free By Host"
}]

api.update_dashboard(dash_id, title, description, graphs)
