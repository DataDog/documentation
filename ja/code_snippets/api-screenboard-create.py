from datadog import initialize, api

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

board_title = "My Screenboard"
description = "An informative screenboard."
width = 1024
widgets = [{
  "type": "image",
  "height": 20,
  "width": 32,
  "y": 7,
  "x": 32,
  "url": "https://path/to/image.jpg"
  }]
template_variables = [{
  "name": "host1",
  "prefix": "host",
  "default": "host:my-host"
}]

api.Screenboard.create(board_title=board_title, description=description,
  widgets=widgets, template_variables=template_variables, width=width)
