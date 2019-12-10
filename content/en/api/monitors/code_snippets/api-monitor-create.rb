require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Create a new monitor
options = {
  'notify_no_data' => true,
  'no_data_timeframe' => 20
}
tags = ['app:webserver', 'frontend']
dog.monitor(
  'metric alert',
  'avg(last_5m):sum:system.net.bytes_rcvd{host:host0} > 100',
  name: 'Bytes received on host0',
  message: 'We may need to add web hosts if this is consistently high.',
  tags: tags,
  options: options
)
