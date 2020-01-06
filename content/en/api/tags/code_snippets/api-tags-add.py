from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

api.Tag.create("<YOUR_HOSTNAME>", tags=[
               "role:database", "environment:production"])
