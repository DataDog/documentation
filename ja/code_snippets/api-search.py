from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Search by `host` facet.
api.Infrastructure.search(q="hosts:database")

# Search by `metric` facet.
api.Infrastructure.search(q="metrics:system")

# Search all facets.
api.Infrastructure.search(q="test")
