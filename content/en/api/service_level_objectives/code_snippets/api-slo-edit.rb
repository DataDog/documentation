require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'
slo_id  = '<YOUR_SLO_ID>'

dog = Dogapi::Client.new(api_key, app_key)

# Update an existing SLO (cannot change the 'type')
thresholds = [
  {:timeframe => "7d", :target => 95},
  {:timeframe => "30d", :target => 95, :warning => 97},
]
tags = ['app:webserver', 'frontend']

dog.update_service_level_objective(
    slo_id,
    :type => "metric",
    :name => "Custom Metric SLO",
    :description => "SLO tracking custom service SLO",
    :numerator => "sum:my.custom.metric{type:good}.as_count()",
    :denominator => "sum:my.custom.metric{*}.as_count()",
    :tags => tags,
    :thresholds => thresholds
)
