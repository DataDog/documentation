require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

hostname = "test.host"
message = "Muting this host for a test."
end_ts = Time.now.to_i + 60 * 60
dog.mute_host(hostname, :message => message, :end => end_ts)