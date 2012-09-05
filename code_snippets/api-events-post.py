from dogapi import dog_http_api as api

api.api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
api.application_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

title = "Something big happened!"
text = 'And let me tell you all about it here!'
tags = ['version:1', 'application:web']

# All optional parameters are specified as keyword arguments.
api.event_with_response(title, text, tags=tags)
