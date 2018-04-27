from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)
hosts = api.Infrastructure.search(q='hosts:')
api.Tag.create(hosts['results']['hosts'][0], tags=["role:codesample"])

