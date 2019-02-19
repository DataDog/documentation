from datadog import initialize, api

# Intialize request parameters including API/APP key
options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Call Embed API function
api.Embed.get_all()
