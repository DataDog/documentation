from datadog import initialize, api
import time

options = {
    'api_key': '<DATADOG_API_KEY>'
}

initialize(**options)

now = time.time()
future_10s = now + 10

# Submit a single point with a timestamp of `now`
api.Metric.send(metric='page.views', points=1000)

# Submit a point with a timestamp (must be ~current)
api.Metric.send(metric='my.pair', points=(now, 15))

# Submit multiple points.
api.Metric.send(
    metric='my.series',
    points=[
        (now, 15),
        (future_10s, 16)
    ]
)

# Submit a point with a host and tags.
api.Metric.send(
    metric='my.series',
    points=100,
    host="myhost.example.com",
    tags=["version:1"]
)

# Submit multiple metrics
api.Metric.send([{
    'metric': 'my.series',
    'points': 15
}, {
    'metric': 'my1.series',
    'points': 16
}])
