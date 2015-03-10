from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Search by `host` facet.
api.Infrastructure.search(q="hosts:database")

# Search by `metric` facet.
api.Infrastructure.search(q="metrics:system")

# Search all facets.
api.Infrastructure.search(q="test")
