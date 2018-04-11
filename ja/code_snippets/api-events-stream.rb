require 'rubygems'
require 'dogapi'

api_key='<YOUR_API_KEY>'
app_key='<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

end_time = Time.now.to_i
start_time = end_time - 100

dog.stream(start_time, end_time, :priority=>"normal", :tags=>["application:web"])
