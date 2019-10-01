from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

slo_ids = ["<YOUR_SLO_ID>", "<YOUR_SLO_ID>"]

initialize(**options)

api.ServiceLevelObjective.delete_many(slo_ids)
