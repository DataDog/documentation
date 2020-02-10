from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
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
        'id': '87'
    },
    {
        'type': 'integration_timeboard',
        'id': '23'
    },
    {
        'type': 'host_timeboard',
        'id': '3245468'
    }
]

api.DashboardList.v2.update_items(list_id, dashboards=dashboards)
