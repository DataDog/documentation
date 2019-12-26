require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'
slo_id  = '<YOUR_SLO_ID>'

dog = Dogapi::Client.new(api_key, app_key)

to_ts = 1_571_320_613
from_ts = to_ts - 60 * 60 * 24 * 30

dog.get_service_level_objective_history(slo_id, from_ts, to_ts)
