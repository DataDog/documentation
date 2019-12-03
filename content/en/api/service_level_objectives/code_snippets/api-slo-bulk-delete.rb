require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

slo_id_one = '<YOUR_FIRST_SLO_ID>'.freeze
slo_id_two = '<YOUR_SECOND_SLO_ID>'.freeze

dog = Dogapi::Client.new(api_key, app_key)

# Delete multiple timeframes
thresholds = {
  slo_id_one => %w[7d],
  slo_id_two => %w[7d 30d]
}
dog.delete_timeframes_service_level_objective(thresholds)
