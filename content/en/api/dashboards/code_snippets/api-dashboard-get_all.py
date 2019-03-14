from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# retrieve all screenboards (dashboard with `free` layout)
api.Dashboard.get_all(layout_type='free')

# retrieve all timeboards (dashboard with `ordered` layout)
api.Dashboard.get_all(layout_type='ordered')

# retrieve all custom dashboards (dashboard with `free` or `ordered` layout)
api.Dashboard.get_all()
