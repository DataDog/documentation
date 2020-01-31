from datadog import initialize, api

# Intialize request parameters including API/APP key
options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Call Embed API function
api.Embed.get_all()
