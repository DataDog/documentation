from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

list_id = 4741
dashboards = [
    {
        'type': 'custom_screenboard',
        'id': 'rys-xwq-geh'
    },
    {
        'type': 'custom_timeboard',
        'id': 'qts-q2k-yq6'
    },
    {
        'type': 'integration_screenboard',
        'id': 'jk9-p5y-ii6'
    },
    {
        'type': 'integration_timeboard',
        'id': 'nf5-aju-tmr'
    },
    {
        'type': 'host_timeboard',
        'id': 'jsb-8sp-iz5'
    }
]

api.DashboardList.v2.update_items(list_id, dashboards=dashboards)
