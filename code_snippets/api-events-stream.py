from datadog import initialize, api
import time

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)


start_time = time.time()
end_time = time.time() + 100

api.Event.query(start=start_time, end=end_time, priority="normal", tags=["application:web"])
