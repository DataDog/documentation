require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

type = 'metric alert'
query = 'THIS IS A BAD QUERY'
parameters = {
  name: 'Bytes received on host0',
  message: 'We may need to add web hosts if this is consistently high.',
  tags: ['app:webserver', 'frontend'],
  options: {
    notify_no_data: true,
    no_data_timeframe: 20,
    thresholds: { critical: 90.0 }
  }
}

# Validate a monitor definition
dog.validate_monitor(type, query, parameters)
