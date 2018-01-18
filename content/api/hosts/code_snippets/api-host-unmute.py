from datadog import initialize, api

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

# Find a host to unmute
hosts = api.Infrastructure.search(q='hosts:')

# Unmute host
api.Host.unmute(hosts['results']['hosts'][0])
