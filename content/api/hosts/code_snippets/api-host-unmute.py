from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Find a host to unmute
hosts = api.Infrastructure.search(q='hosts:')

# Unmute host
api.Host.unmute(hosts['results']['hosts'][0])
