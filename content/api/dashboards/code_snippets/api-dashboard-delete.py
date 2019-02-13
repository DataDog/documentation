from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

dashboard_id = '<DASHBOARD_ID>'

api.Dashboard.delete(dashboard_id)
