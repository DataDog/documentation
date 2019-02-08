from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

dashboard_id = 'qc9-tuk-9kv'

api.Dashboard.get(dashboard_id)
