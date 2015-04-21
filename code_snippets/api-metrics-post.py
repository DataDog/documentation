from datadog import initialize, api
import time

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

CurrentPosixTime = time.time()
CurrentPosixTime10 = time.time() + 10

initialize(**options)

# Submit a single point with a timestamp of `now`
api.Metric.send(metric='page.views', points=1000)

# Submit a point with a timestamp (must be ~current)
api.Metric.send(metric='my.pair', points=(CurrentPosixTime, 15))

# Submit multiple points.
api.Metric.send(metric='my.series', points=[(CurrentPosixTime, 15), (CurrentPosixTime10, 16)])

# Submit a point with a host and tags.
api.Metric.send(metric='my.series', points=100, host="myhost.example.com", tags=["version:1"])

# Submit multiple metrics
api.Metric.send([{'metric':'my.series', 'points':15}, {'metric':'my1.series', 'points':16}])
