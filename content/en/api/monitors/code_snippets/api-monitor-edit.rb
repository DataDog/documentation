require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Edit an existing monitor
dog.update_monitor(
  91_879,
  'avg(last_5m):sum:system.net.bytes_rcvd{host:host0} > 100',
  message: 'Bytes received on host0',
  name: 'We may need to add web hosts if this is consistently high.'
)
