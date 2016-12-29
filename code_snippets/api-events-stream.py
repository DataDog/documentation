from datadog import initialize, api
import time

options = {
    'api_key': '9775a026f1ca7d1c6c5af9d94d9595a4',
    'app_key': '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'
}

initialize(**options)


end_time = time.time()
start_time = time.time() - 100

api.Event.query(start=start_time, end=end_time, priority="normal", tags=["application:web"])
