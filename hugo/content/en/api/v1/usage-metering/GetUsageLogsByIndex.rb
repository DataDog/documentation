require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

start_date= '2020-01-01T00'
end_date='2019-01-01T02'
index_name='main, marketing'

dog.get_logs_by_index_usage(start_date, end_date, index_name)