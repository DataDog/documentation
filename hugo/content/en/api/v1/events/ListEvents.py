from datadog import initialize, api
import time

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

end_time = time.time()
start_time = end_time - 100

api.Event.query(
    start=start_time,
    end=end_time,
    priority="normal",
    tags=["-env:dev,application:web"],
    unaggregated=True
)
