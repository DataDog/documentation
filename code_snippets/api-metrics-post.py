from dogapi import dog_http_api as api

api.api_key = 'apikey_3'
api.application_key = '9d945c35fd7cc7abb1088fd0632ef8e25516af74'

# Submit a single point with a timestamp of `now`
api.metric('page.views', 1000)

# Submit a point with a timestamp.
api.metric('my.pair', (1317652676, 15))

# Submit multiple points.
api.metric('my.series', [(1317652676, 15), (1317652800, 16)])

# Submit a point with a host and tags.
api.metric('my.series', 100, host="myhost.example.com", tags=["version:1"])
