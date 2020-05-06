from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

slo_ids = ['<YOUR_SLO_ID>']

initialize(**options)

api.ServiceLevelObjective.can_delete(slo_ids)
