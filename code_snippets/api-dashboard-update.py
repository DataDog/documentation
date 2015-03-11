from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

title = "My Timeboard"
description = "A new and improved timeboard!"
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
template_variables = [{
	"name": "host1",
	"prefix": "host",
	"default": "host:my-host"
}]

api.Timeboard.update(4952, title=title, description=description, graphs=graphs, template_variables=template_variables)
