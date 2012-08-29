from dogapi import dog_http_api as api

api.api_key = 'apikey_2'
api.application_key = '01a39483d351f4f827571cb7091a39e82f86edcc'
api.api_host = 'https://app.datad0g.com'

dash_id = 1588
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

print api.update_dashboard(dash_id, title, description, graphs)
