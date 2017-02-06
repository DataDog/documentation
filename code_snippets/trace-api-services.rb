require 'net/http'
require 'json'

# Send the service.
service = {
    'service_name' => {
        'app' => 'my-app',
        'app_type' => 'web'
    }
}

uri = URI('http://localhost:7777/v0.3/services')
request = Net::HTTP::Put.new(uri)
request.body = JSON.generate(service)
request.content_type = 'application/json'

response = Net::HTTP.start(uri.hostname, uri.port) do |http|
    http.request(request)
end
