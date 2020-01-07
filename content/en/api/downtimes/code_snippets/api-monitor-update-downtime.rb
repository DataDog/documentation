require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Update a downtime
downtime_id = 4336
dog.update_downtime(
  downtime_id,
  scope: 'env:testing',
  end: Time.now.to_i + 60_000,
  message: 'Doing some testing on staging.'
)
