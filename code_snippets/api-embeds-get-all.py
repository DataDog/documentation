from datadog import initialize, api

# Intialize request parameters including API/APP key
options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

# Call Embed API function
api.Embed.get_all()
