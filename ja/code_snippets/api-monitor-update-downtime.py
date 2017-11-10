from datadog import initialize, api
import time


options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)

# Get an existing downtime
stagingDowntimes = []
downtimes = api.Downtime.get_all()

for item in downtimes:
  if item['scope'] == ['env:staging']:
    stagingDowntimes.append(item)



# Update that downtime
api.Downtime.update(stagingDowntimes[0]['id'], scope='env:staging', end=int(time.time()) + 60000, message="Doing some testing on staging.")
