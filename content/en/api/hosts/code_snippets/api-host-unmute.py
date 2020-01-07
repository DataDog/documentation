from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Find a host to unmute
hosts = api.Hosts.search(q='hosts:')

# Unmute host
api.Host.unmute(hosts['results']['hosts'][0])
