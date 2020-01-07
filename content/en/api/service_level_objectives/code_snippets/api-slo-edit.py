from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

slo_id = "<YOUR_SLO_ID>"

initialize(**options)

# Update an existing SLO (cannot change the 'type')

thresholds = [
  {"timeframe": "7d", "target": 95},
  {"timeframe": "30d", "target": 95, "warning": 97},
]
tags = ["app:webserver", "frontend"]
api.ServiceLevelObjective.update(
    id=slo_id,
    type="metric",
    name="Custom Metric SLO",
    description="SLO tracking custom service SLO",
    numerator="sum:my.custom.metric{type:good}.as_count()",
    denominator="sum:my.custom.metric{*}.as_count()",
    tags=tags,
    thresholds=thresholds
)
