require 'rubygems'
require 'dogapi'

# Initialize API Client
api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Get all with API Call
dog.get_all_embeds()