require 'rubygems'
require 'dogapi'

api_key='9775a026f1ca7d1c6c5af9d94d9595a4'
app_key='87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Create a new monitor
options = {
  'notify_no_data' => true,
  'no_data_timeframe' => 20
}
tags = ['app:webserver', 'frontend']
dog.monitor("metric alert", "avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100", :name => "Bytes received on host0", :message => "We may need to add web hosts if this is consistently high.", :tags => tags, :options => options)
