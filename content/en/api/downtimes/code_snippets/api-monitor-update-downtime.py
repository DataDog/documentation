from datadog import initialize, api
import time

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

# Get an existing downtime
stagingDowntimes = []
downtimes = api.Downtime.get_all()

for item in downtimes:
    if item['scope'] == ['env:staging']:
        stagingDowntimes.append(item)

# Update that downtime
api.Downtime.update(
    stagingDowntimes[0]['id'],
    scope='env:staging',
    end=int(time.time()) + 60000,
    message="Doing some testing on staging."
)
