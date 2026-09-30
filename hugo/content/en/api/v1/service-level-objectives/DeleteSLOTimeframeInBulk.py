from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

slo_id_1 = '<YOUR_SLO_ID>'
slo_id_2 = '<YOUR_SLO_ID>'

initialize(**options)

delete_timeframes = {
  slo_id_1: ["7d"]
  slo_id_2: ["7d", "30d"]
}

api.ServiceLevelObjective.bulk_delete(delete_timeframes)
