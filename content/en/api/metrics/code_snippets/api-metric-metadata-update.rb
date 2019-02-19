require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

updates = {
    "type" => "gauge",
    "description" => "my custom description",
    "short_name" => "bytes sent",
    "unit" => "byte",
    "per_unit" => "second"
}

# Submit updates for metric
result = dog.update_metadata('system.net.bytes_sent', updates)