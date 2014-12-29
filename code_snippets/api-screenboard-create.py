from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

title = "My Screenboard"
description = "An informative screenboard."
width = 1024
board = [{
  "type": "image",
  "height": 20,
  "width": 32,
  "y": 7,
  "x": 32,
  "url": "https://path/to/image.jpg"
  }
  ]
template_variables = [{
  "name": "host1",
  "prefix": "host",
  "default": "host:my-host"
}]

api.Screenboard.create(title=title, description=description, graphs=board,
  template_variables=template_variables, width=width)
