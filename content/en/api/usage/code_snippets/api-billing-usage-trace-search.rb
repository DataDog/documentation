require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

start_date= '2019-10-07T00'
end_date='2019-10-07T02'

dog.get_traces_usage(start_date, end_date)
