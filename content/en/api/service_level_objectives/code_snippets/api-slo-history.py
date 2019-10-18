from datadog import initialize, api
import time

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

slo_id = '<YOUR_SLO_ID>'

initialize(**options)

to_ts = int(time.time())
from_ts = to_ts - 60*60*24*30

api.ServiceLevelObjective.history(slo_id, from_ts=from_ts, to_ts=to_ts)
