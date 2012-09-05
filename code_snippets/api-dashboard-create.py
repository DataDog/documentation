from dogapi import dog_http_api as api

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

title = "My Dashboard"
description = "An informative dashboard."
graphs =  [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
    "viz": "timeseries"
    },
    "title": "Average Memory Free"
}]

api.create_dashboard(title, description, graphs)
