require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Create a new SLO
thresholds = [
  { timeframe: '7d', target: 95 },
  { timeframe: '30d', target: 95, warning: 97 }
]
tags = ['app:webserver', 'frontend']
dog.create_service_level_objective(
  type: 'metric',
  name: 'Custom Metric SLO',
  description: 'SLO tracking custom service SLO',
  numerator: 'sum:my.custom.metric{type:good}.as_count()',
  denominator: 'sum:my.custom.metric{*}.as_count()',
  tags: tags,
  thresholds: thresholds
)
