require 'rubygems'
require 'dogapi'

api_key = '9775a026f1ca7d1c6c5af9d94d9595a4'
app_key = '87ce4a24b5553d2e482ea8a8500e71b8ad4554ff'

dog = Dogapi::Client.new(api_key, app_key)

# Mute a host
hostname = 'test.host'
message = 'Muting this host for a test.'
end_ts = Time.now.to_i + 60 * 60
dog.mute_host(hostname, :message => message, :end => end_ts)
