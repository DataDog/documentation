from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Find a host to mute
hosts = api.Hosts.search(q='hosts:')
# Mute a host
api.Host.mute(hosts['results']['hosts'][0])
