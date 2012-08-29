from dogapi import dog_http_api as api

api.api_key = 'apikey_2'
api.application_key = '01a39483d351f4f827571cb7091a39e82f86edcc'
api.api_host = 'https://app.datad0g.com'

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

print api.create_dashboard(title, description, graphs)
