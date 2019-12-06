from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

# Create a new SLO
thresholds = [
  {"timeframe": "7d", "target": 95},
  {"timeframe": "30d", "target": 95, "warning": 97},
]
tags = ["app:webserver", "frontend"]
api.ServiceLevelObjective.create(
    type="metric",
    name="Custom Metric SLO",
    description="SLO tracking custom service SLO",
    query={
        "numerator": "sum:my.custom.metric{type:good}.as_count()",
        "denominator": "sum:my.custom.metric{*}.as_count()"
    },
    tags=tags,
    thresholds=thresholds
)
