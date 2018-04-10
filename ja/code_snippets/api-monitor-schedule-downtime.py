from datadog import initialize, api
import time

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Repeat for 3 hours (starting now) on every week day for 4 weeks.
start_ts = int(time.time())
end_ts = start_ts + (3 * 60 * 60)
end_reccurrence_ts = start_ts + (4* 7 * 24 * 60 * 60) # 4 weeks from now

recurrence = {
    'type': 'weeks',
    'period': 1,
    'week_days': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    'until_date': end_reccurrence_ts
}

# Schedule downtime
api.Downtime.create(scope='env:staging', start=start_ts, end=end_ts, recurrence=recurrence)
