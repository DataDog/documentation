from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)

# Submit a single point with a timestamp of `now`
api.Metric.send(metric='page.views', points=1000)

# Submit a point with a timestamp (must be ~current)
api.Metric.send(metric='my.pair', points=(1317652676, 15))

# Submit multiple points.
api.Metric.send(metric='my.series', points=[(1317652676, 15), (1317652800, 16)])

# Submit a point with a host and tags.
api.Metric.send(metric='my.series', points=100, host="myhost.example.com", tags=["version:1"])
