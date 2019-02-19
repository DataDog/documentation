from datadog import initialize, api
import time

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

end_time = time.time()
start_time = end_time - 100

api.Event.query(
    start=start_time,
    end=end_time,
    priority="normal",
    tags=["application:web"],
    unaggregated=true
)
