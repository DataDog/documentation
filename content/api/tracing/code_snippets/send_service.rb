require 'net/http'

port = 8126
host = "localhost"
path = "/v0.3/services"


req = Net::HTTP::Put.new(path, initheader = { 'Content-Type' => 'application/json'})

req.body = {"service_name": {"app": "my-app","app_type": "web"}}

response = Net::HTTP.new(host, port).start {|http| http.request(req) }