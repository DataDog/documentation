from datadog import initialize, api

options = {
    'api_key': 'api_key',
    'app_key': 'app_key'
}

initialize(**options)


start_time = 1419436850
end_time = 1419436870

api.Event.query(start=start_time, end=end_time, priority="normal", tags=["application:web"])
