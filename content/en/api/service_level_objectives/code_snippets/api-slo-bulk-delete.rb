require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

slo_id_1 = '<YOUR_SLO_ID>'.freeze
slo_id_2 = '<YOUR_SLO_ID>'.freeze

dog = Dogapi::Client.new(api_key, app_key)

# Delete multiple timeframes
thresholds = {
  slo_id_1: ["7d"]
  slo_id_2: ["7d", "30d"]
}
dog.delete_timeframes_service_level_objective(thresholds)
