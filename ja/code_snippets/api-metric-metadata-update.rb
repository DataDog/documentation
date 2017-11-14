require 'rubygems'
require 'dogapi'

api_key = "9775a026f1ca7d1c6c5af9d94d9595a4"

dog = Dogapi::Client.new(api_key)

updates = {
    "type" => "gauge",
    "description" => "my custom description",
    "short_name" => "bytes sent",
    "unit" => "byte",
    "per_unit" => "second"
}

# Submit updates for metric
result = dog.update_metadata('system.net.bytes_sent', updates)
